import axios from 'axios'
import { AdminActionTypes } from '../types'
import { toast } from 'react-toastify'
import download from 'downloadjs'
import base from '../base'

export const getCurrentIdea = (idea) => (dispatch) => {
  dispatch(setCurrentIdea(idea))
}

const printErr = (err,callback) => {
    console.log("Error response",err?.response);
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

export const getApplicantDetailById =
  (mounted, id, type, callback) => (dispatch) => {
    const token = localStorage.getItem(type == 'labincharge'? 'labinchargeToken': 'adminToken')
    console.log(token);
    axios.get(base()+`/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (mounted) {
          dispatch(setCurrentApplication(res.data))
          callback()
        }
      })
      .catch((err) => printErr(err,callback))
}

export const loginAdmin = (adminData, callback) => (dispatch) => {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('labinchargeToken')

  axios
    .post(base()+'/login', adminData )
    .then((res) => {
        const { token,role } = res.data.data
        if(role !== "admin@64XJDH" && role !== "labincharge@64XJDH")
        {
          console.log(res);
          printErr({response:{data:{message:"You are not Admin"}}},callback)
          return;
        }

        dispatch(setCurrentAdminId(res.data.email))
        dispatch(setCurrentAdminType('iitism'))
        callback()
        toast.success('Logged In Successfully! 😄', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
        setTimeout(() => {
              if(role === "labincharge@64XJDH") {
                localStorage.setItem('labinchargeToken', token)
                window.location.pathname = '/Labincharge_dashboard'
              }
              else if(role === "admin@64XJDH") {
                localStorage.setItem('adminToken', token)
                window.location.pathname = '/Admin_dashboard'
              }
            },
          1200);
    })
    .catch((err) => printErr(err,callback))
}

export const downloadPdf = (id, name, callback) => (dispatch) => {
  let token = localStorage.getItem('adminToken')
  if(!token)
  token = localStorage.getItem('labinchargeToken')
  axios
    .get(base()+`/pdf/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    })
    .then((response) => {
      const content = response.headers['content-type']
      download(response.data, name+'Application', content)
      callback()
    })
    .catch((err) => printErr(err,callback))
}

export const addEvent = (data, callback) => {
  const token = localStorage.getItem('adminToken')

  axios.post(base()+`/events`, data , {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        if(res.success){
            toast.success(res.data.title + ' 😊', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            callback(res.data);
        }
        callback("event not added")
    })
    .catch((err) => printErr(err,callback))
}

export const setCurrentPdf = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_PDF,
    payload: data
  }
}

export const setCurrentIdea = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_IDEA,
    payload: data
  }
}

export const setCurrentApplication = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_APPLICATION,
    payload: data
  }
}

export const setCurrentAdminId = (id) => {
  return {
    type: AdminActionTypes.SET_CURRENT_ADMIN_ID,
    payload: id
  }
}

export const setCurrentAdminType = (type) => {
  return {
    type: AdminActionTypes.SET_CURRENT_ADMIN_TYPE,
    payload: type
  }
}

export const logoutAdmin = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('adminToken')

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdminId(null))
  dispatch(setCurrentAdminType(null))
}
