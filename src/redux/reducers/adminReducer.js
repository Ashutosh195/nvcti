import { AdminActionTypes } from '../types'

const initialState = {
  adminId: '',
  currentIdea: null,
  currentApplication: {},
  type: '',
  currentPdf: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AdminActionTypes.SET_CURRENT_ADMIN_ID:
      return {
        ...state,
        adminId: action.payload
      }
    case AdminActionTypes.SET_CURRENT_ADMIN_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case AdminActionTypes.SET_CURRENT_APPLICATION:
      return {
        ...state,
        currentApplication: action.payload
      }
    case AdminActionTypes.SET_CURRENT_IDEA:
      return {
        ...state,
        currentIdea: action.payload
      }
    case AdminActionTypes.SET_CURRENT_PDF:
      return {
        ...state,
        currentPdf: action.payload
      }
    default:
      return state
  }
}
