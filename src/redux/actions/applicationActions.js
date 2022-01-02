import axios from 'axios'
import store from '../../store'
import { ApplicationActionTypes } from '../types'
import { toast } from 'react-toastify'
import base from '../base'
import download from 'downloadjs'

const token = localStorage.getItem('jwtToken')
const adminToken = localStorage.getItem('adminToken')
const currUser = store.getState().user

const printerr = (err,callback) => {
  console.log(" err",err?.response);
  toast.error(err?.response?.data?.message + ' 🙁', {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
})
callback()
}

// Get all applications api call
export const getAllApplications = (mounted) => (dispatch) => {
  axios.get(base() + '/user/applications/' + currUser.userId ).then((res) => {
    dispatch(setAllApplications(res.data))
    })
    .catch(e => printerr(e))
}

export const submitApplication = (appData, callback) => (dispatch) => {
  axios
    .post(base() + '/applications/create', appData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setTimeout(() => {
        toast.success('Application Submitted Successfully! 😄', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setTimeout(() => window.location.reload(), 2100)
      }, 3500)
      callback()
    })
    .catch((err) => printerr(err,callback))
}

// Submit a valid profile id card
export const uploadIdCard = (data, callback) => (dispatch) => {
  axios
    .put(base() + `/applicants/${currUser.userId}/avatar`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      toast.success('Id Uploaded Successfully! 😄', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
    .catch((err) => printerr(err,callback))
}

// Submit a valid profile signature
export const uploadSign = (data, callback, admin) => (dispatch) => {
  axios
    .put(base() + 
      `/applicants/${currUser.userId}/signature`,
      data,
      {
        headers: { Authorization: `Bearer ${admin ? adminToken : token}` }
      }
    )
    .then((res) => {
      toast.success('Signature Uploaded Successfully! 😄', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
    .catch((err) => printerr(err,callback))
}

// get applicant file details
export const getApplicantPitchFile = (id, callback, name) => (dispatch) => {
  // axios
  //   .get(base() + `/applications/${id}/document`, {
  //     headers: { Authorization: `Bearer ${adminToken}` },
  //     responseType: 'blob'
  //   })
  //   .then((response) => {
  //     const content = response.headers['content-type']
  //     download(response.data, name + 'PitchFile', content)
  //     callback()
  //   })
  //   .catch((err) => printerr(err,callback))
}

// Set All Applications
export const setAllApplications = (data) => {
  return {
    type: ApplicationActionTypes.GET_ALL_APPLICATIONS,
    payload: data
  }
}

// Make an application
export const setCurrentApplication = (data) => {
  return {
    type: ApplicationActionTypes.MAKE_APPLICATION,
    payload: data
  }
}

// Set Current Applicant File
export const setCurrentPitchFile = (data) => {
  return {
    type: ApplicationActionTypes.SET_CURRENT_FILE,
    payload: data
  }
}
