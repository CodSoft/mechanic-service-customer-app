import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const emailCheckRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getScreenWidth = (value: any) => {
  if (value) {
    let finalValue = (screenWidth * value) / 100;
    return finalValue;
  } else {
    return screenWidth;
  }
};

export const getScreenHeight = (value: any) => {
  if (value) {
    let finalValue = (screenHeight * value) / 100;
    return finalValue;
  } else {
    return screenHeight;
  }
};

export const getUtcOffset = () => {
  var date = new Date();
  var utcOffsetInSecond = -date.getTimezoneOffset();
  return utcOffsetInSecond;
};

export const checkEmail = (email: any) => {
  return emailCheckRegex.test(email.trim());
};

export const checkPassword = (password: any) => {
  return password.trim().length >= 3;
};

export const getNumbersOnly = (value: any) => {
  return value.replace(/[^0-9]/g, '');
};
