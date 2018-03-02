import {
  SET_USER_DATA,
  SUCCESS_SET_TOKEN,
  FAILED_SET_TOKEN,
  FAILED_GET_USER_LOCATION,
  SUCCESS_GET_USER_LOCATION,
  SUCCESS_VERIFY_TOKEN,
  CHANGE_RECEIVE_STATUS,
  EMIT_WAYPOINT_RECEIVE_STARTED,
  EMIT_WAYPOINT_RECEIVE_STOPPED,
  SET_INTERVAL_ID,
  SET_SELECTED_DURATION, CHANGE_DURATION_SUCCESS,
  SET_IO_SOCKET,
  SET_INTERVAL_ALIVE,
  SET_DST_EMAIL,

}
from '../constants/constants';

const intialState = {
  user: {},
  success: false,
  error: false,
  isFetching: true,
  position: {},
  message: null,
  duration: 8000,
  tempDuration: 0,
  receive: true,
  emitStatus: false,
  timeoutID: 0,
  intervalAlive: true,
  dstEmail: null,
  socketIO: null,
};

const reducer = (state = intialState, action) => {
switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state, user: action.data,
    };

case SUCCESS_SET_TOKEN:
  return {
    ...state, success: action.success, socketIO: action.socketIO,
  };
case FAILED_SET_TOKEN:
  return {
    ...state, error: action.error,
  };

case SUCCESS_GET_USER_LOCATION:
  return {
    ...state, position: action.position, isFetching: action.isFetching,
  };

case FAILED_GET_USER_LOCATION:
  return {
    ...state, error: action.error,
  };
case SUCCESS_VERIFY_TOKEN:
  return {
    ...state,
  };

case CHANGE_RECEIVE_STATUS:
return {
  ...state, receive: action.receive,
};

case CHANGE_DURATION_SUCCESS:
  return {
    ...state, duration: action.duration,
  };

case EMIT_WAYPOINT_RECEIVE_STOPPED:
  return {
    ...state, emitStatus: action.emitStatus, intervalAlive: action.intervalAlive,
  };

case EMIT_WAYPOINT_RECEIVE_STARTED:
  return {
    ...state, emitStatus: action.emitStatus, intervalAlive: action.intervalAlive,
  };

case SET_INTERVAL_ID:
  return {
    ...state, timeoutID: action.timeoutID,
  };

case SET_SELECTED_DURATION:
  return {
    ...state, tempDuration: action.duration,
  };

case SET_IO_SOCKET:
  return {
    ...state, socketIO: action.socket,
  };

case SET_INTERVAL_ALIVE:
  return {
    ...state, intervalAlive: action.status,
  };

case SET_DST_EMAIL:
  return {
    ...state, dstEmail: action.email,
  };

default:
  return state;
 }
};

export default reducer;
