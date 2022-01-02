import axios from "axios";
import base from '../base'

export const sendMessage = (msgData, callback) => {
  return new Promise((resolve, reject) => {
    axios
    .post(base()+"/messages", msgData, {})
    .then((res) => {
      callback();
      resolve(res);
    })
    .catch((err) => {
      callback();
      reject(err.response);
    });
  })
};