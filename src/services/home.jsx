import { axiosInstance } from "./API";


export const getHomeData = async () => {
  let res;
  try {
    res = await axiosInstance.get(`home`);
  } catch (err) {
    return {};
  }
 
  return {
    data: res?.data.data,
  };
};

export const getSettingData = async () => {
  let res;
  try {
    res = await axiosInstance.get(`settings`);
  } catch (err) {
    return {};
  }
  
  return {
    data: res?.data.data,
  };
};


export const getFaqData = async () => {
  let res;
  try {
    res = await axiosInstance.get(`faq-data`);
  } catch (err) {
    return {};
  }

  return {
    data: res?.data.data,
  };
};

export const getCms = async () => {
  let res;
  try {
    res = await axiosInstance.get(`cms`);
  } catch (err) {
    return {};
  }
  console.log(res);
  return {
    data: res?.data.data,
  };
};

export const unsubscribeNewsletter = async (data) => {
  let res;
  try {
    res = await axiosInstance.post(`home/newsletter/unsubscribe`, data);
  } catch (err) {
    return false;
  }
  return res.data;
};
