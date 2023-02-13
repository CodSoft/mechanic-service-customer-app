import {useCallback} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

// Files
import {BASE_URL} from '../constants/api';
import {setTokens, signOut} from '../redux/auth';
import {getUtcOffset} from '../utils/domUtils';
import {Alert} from 'react-native';

const getInstance = ({
  tokens,
  setTokens,
  logOut,
  customUrl,
  url,
  KeyId,
}: any) => {
  const instance = axios.create({
    baseURL: customUrl ? url : BASE_URL,
  });

  instance.interceptors.request.use(
    (config: any) => {
      config.headers['UtcOffsetInSecond'] = getUtcOffset();
      if (KeyId !== 0) {
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers['KeyId'] = KeyId;
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      if (tokens) {
        config.headers['Authorization'] = 'Bearer ' + tokens;
        // config.headers['AuthorizationToken'] = 'Bearer ' + tokens;
      }
      return config;
    },
    (error: any) => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response: any) {
      return response;
    },
    function (err: any) {
      const status = err.response?.status || 500;
      switch (status) {
        case 401: {
          // logOut();
          throw new Error(err.message);
        }

        // forbidden (permission related issues)
        case 403: {
          throw new Error(err.message);
        }

        // bad request
        case 400: {
          throw new Error(err.message);
        }

        // not found
        case 404: {
          throw new Error(err.message);
        }

        // conflict
        case 409: {
          throw new Error(err.message);
        }

        // unprocessable
        case 422: {
          throw new Error(err.message);
        }

        // generic api error (server related) unexpected
        default: {
          throw new Error(err.message);
        }
      }
    },
  );

  return instance;
};

const useApi = () => {
  const tokens = useSelector((state: any) => state.auth.tokens);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const setToken = useCallback(
    (data: any) => {
      dispatch(setTokens(data));
    },
    [dispatch],
  );

  const apiCall = useCallback(
    async ({
      KeyId = 0,
      customUrl = false,
      type,
      url,
      data,
      params = {},
    }: any) => {
      const instance = getInstance({
        tokens,
        setToken,
        logOut,
        customUrl,
        url,
        KeyId,
      });

      try {
        switch (type) {
          case 'POST': {
            let res = await instance.post(url, data, {
              params: params,
            });
            return res;
          }

          case 'PUT': {
            let res = await instance.put(url, data, {
              params: params,
            });
            return res;
          }

          case 'DELETE': {
            let res = await instance.delete(url, {});
            return res;
          }

          case 'GET': {
            let res = await instance.get(url);
            return res;
          }

          default: {
            let res = await instance.get(url);
            return res;
          }
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    [logOut, setToken, tokens],
  );

  return {apiCall};
};

export default useApi;
