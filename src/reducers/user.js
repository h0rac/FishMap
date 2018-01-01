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
	EMIT_WAYPOINT_RECEIVE_STOP,
	EMIT_WAYPOINT_RECEIVE_STARTED,
	SET_TIMEOUT_ID,
	SET_SELECTED_DURATION, CHANGE_DURATION_SUCCESS,
	SET_IO_SOCKET

}
	from '../constants/constants';
import { setFishmark } from '../actions/fishmarks';

const intialState = {
	user: {},
	success: false,
	error: false,
	position: {},
	message: null,
	duration: 10000,
	tempDuration:0,
	receive: true,
	emitStatus: false,
	intervalId: 0,
	timeoutId:0,
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

		case EMIT_WAYPOINT_RECEIVE_STARTED:
			return {
				...state, emitStatus: action.emitStatus
			};

		case EMIT_WAYPOINT_RECEIVE_STOP:
			return {
				...state, emitStatus: action.emitStatus
			};

		case SET_TIMEOUT_ID:
			return {
				...state, timeoutId: action.id
			};

		case SET_SELECTED_DURATION:
			return {
				...state, tempDuration: action.duration
			}

		case SET_IO_SOCKET:
			return {
				...state, socketIO:action.socket
			}

		default:
			return state;
	}


};

export default reducer;