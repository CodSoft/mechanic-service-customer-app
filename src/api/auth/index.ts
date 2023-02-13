export const login = async (apiCall: any, data: any) => {
    const res = await apiCall({
      customUrl: false,
      type: 'POST',
      url: '/Demo/login',
      data: data,
    });
    return res.data;
  };
  