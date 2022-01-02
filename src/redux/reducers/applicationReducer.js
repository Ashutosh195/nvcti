import { ApplicationActionTypes } from '../types'

const initialState = {
  approved: [],
  rejected: [],
  reverted: [],
  pending: [],
  currentFile: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ApplicationActionTypes.GET_ALL_APPLICATIONS:{
      let N_pending = [], N_approved = [], N_rejected = [], N_reverted = [];
      for(let i=0;i<action.payload.length;i++) {   
        if(action.payload[i].application_verdict === 'PENDING' || action.payload[i].application_verdict === 'Admin_PENDING') {
          action.payload[i].appId=i+1;
          N_pending.push(action.payload[i]);
        }
        if(action.payload[i].application_verdict === 'REVERTED') {
          action.payload[i].appId=i+1;
          N_reverted.push(action.payload[i]);
        }
        if(action.payload[i].application_verdict === 'APPROVED') {
          action.payload[i].appId=i+1;
          N_approved.push(action.payload[i]);
        }
        if(action.payload[i].application_verdict === 'REJECTED' || action.payload[i].application_verdict === 'Admin_REJECTED') {
          action.payload[i].appId=i+1;
          N_rejected.push(action.payload[i]);
        }
      }
      return {
        ...state,
        pending: N_pending,
        approved: N_approved,
        rejected: N_rejected,
        reverted: N_reverted
      }
    }
    case ApplicationActionTypes.SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.payload
      }
    default:
      return state
  }
}
