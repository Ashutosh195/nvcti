import axios from 'axios'
import store from '../../store'
import { toast } from 'react-toastify'
import base from '../base'

const token = localStorage.getItem('jwtToken')

// Get all events api call
export const getAllEvents = (mounted) => {
  const currUser = store.getState().user
  axios
    .get(base() + '/events', {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: currUser.type || 'iitism', userId: currUser.userId }
    })
    .then((res) => {
      if (mounted) {
          // dispatch(setAllevents(res.data))
          return res.data;
      }
    })
    .catch((err) => {
        toast.error(err.response.data.message + ' 🤥', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
    })
}