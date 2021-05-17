import axios from "axios";
import Storage from "./storage";

const baseURL = process.env.REACT_APP_API;

export const urlStorage = new Storage("fail");

const getData = (response) => {
  return response.data || {};
};

const push = (prev, value) => {
  const result = prev || [];

  const absent = result.indexOf(value) === -1;

  if (absent) {
    result.push(value);
  }

  return result;
};

const test = (prev, value) => {
  const arr = prev || [];
  return arr.filter((item) => {
    return item !== value;
  });
};

const request = (url, options = {}) => {
  const { data } = options;

  const dataStorage = new Storage(url);
  dataStorage.value = data;

  urlStorage.value = test(urlStorage.value, url);

  return axios(url, {
    method: "post",
    baseURL,
    ...options,
  })
    .then(getData)
    .catch((e) => {
      urlStorage.value = push(urlStorage.value, url);
      throw e;
    });
};

export default request;
