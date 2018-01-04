import {
	SET_USER_DATA,
	SUCCESS_SET_TOKEN,
	FAILED_SET_TOKEN,
	FAILED_GET_USER_LOCATION,
	SUCCESS_GET_USER_LOCATION,
	VERIFY_TOKEN,
	SUCCESS_VERIFY_TOKEN,
	CHANGE_INTERVAL_TIME_SUCCESS,
	CHANGE_RECEIVE_STATUS,
	CHANGE_DISPLAY_SAVE_STATUS,
	CHANGE_DURATION,
	EMIT_WAYPOINT_RECEIVE_STARTED,
	EMIT_WAYPOINT_RECEIVE_STOPPED,
	SET_TIMEOUT_ID,
	SET_SELECTED_DURATION, CHANGE_DURATION_SUCCESS,
	SET_IO_SOCKET,
	SET_INTERVAL_ALIVE,

}
	from '../constants/constants';
import { setFishmark } from '../actions/fishmarks';

const intialState = {
	user: {},
	success: false,
	error: false,
	position: {},
	message: null,
	duration: 8000,
	tempDuration:0,
	receive: true,
	emitStatus: false,
	intervalId: 0,
	timeoutID:0,
	intervalAlive:true,
	socketIO:null,
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state.user = action.data
			};

		case SUCCESS_SET_TOKEN:
			return {
				...state, success: action.success, socketIO:action.socketIO
			};
		case FAILED_SET_TOKEN:
			return {
				...state, error: action.error
			};

		case SUCCESS_GET_USER_LOCATION:
			return {
				...state, position: action.position
			};

		case FAILED_GET_USER_LOCATION:
			return {
				...state, error: action.error
			};
		case SUCCESS_VERIFY_TOKEN:
			return {
				...state
			};

		case CHANGE_RECEIVE_STATUS:
			return {
				...state, receive: action.receive
			};

		case CHANGE_DURATION_SUCCESS:
			return {
				...state, duration: action.duration
			};

		case EMIT_WAYPOINT_RECEIVE_STOPPED:
			return {
				...state, emitStatus: action.emitStatus, intervalAlive: action.intervalAlive
			};

		case EMIT_WAYPOINT_RECEIVE_STARTED:
			return {
				...state, emitStatus: action.emitStatus, intervalAlive: action.intervalAlive
			};

		case SET_TIMEOUT_ID:
			return {
				...state, timeoutID: action.timeoutID
			};

		case SET_SELECTED_DURATION:
			return {
				...state, tempDuration: action.duration
			}

		case SET_IO_SOCKET:
			return {
				...state, socketIO:action.socket
			}

		case SET_INTERVAL_ALIVE:
			return {
				...state, intervalAlive:action.status
			}

		default:
			return state;
	}


};

export default reducer;