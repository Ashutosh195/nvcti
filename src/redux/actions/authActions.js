import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { UserActionTypes } from "../types";
import { toast } from "react-toastify";
import base from '../base'

export const registerUser = (userData, text, callback) => (dispatch) => {
    if(!userData.instituteName)   userData.instituteName="iitism";
    if(!userData.role)   userData.role="external";
    if(!userData.admissionNumber)   userData.admissionNumber="0";
    if(!userData.hostel)   userData.hostel="*";

  axios
    .post(base() + "/register", userData)
    .then((res) => {
      callback();
        if(!res.data.success)
        return toast.error("User not registered"+ " 🤥\n" + res.data, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        toast.success("Registered Successfully 😄", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    })
    .catch((err) => {
      callback();
      setTimeout(
        () =>
          toast.error(err.response.data.message + " 🤥", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
        2000
      );
    });
};

// Login - get user token
export const loginUser = (userData, type, callback) => (dispatch) => {
  axios
    .post(base() + "/login", userData)
    .then((res) => {
      const { token, email, role } = res.data.data;
      localStorage.setItem('jwtToken', token )

      setAuthToken( token );

      dispatch(setCurrentUserId(email));
      dispatch(setCurrentUserType(role));
      callback();
      setTimeout(() => {
        toast.success("Logged In Successfully! 😄", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => (window.location.pathname = "/profile"), 1000);
      }, 3500);
    })
    .catch((err) => {
      toast.error(err + " 🙁", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      callback();
    });
};

// Set logged in user
export const setCurrentUserId = (data) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_ID,
    payload: data,
  };
};

export const setCurrentUserType = (data) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_TYPE,
    payload: data,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUserId(null));
  dispatch(setCurrentUserType(null));
};
