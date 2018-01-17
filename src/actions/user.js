import {
	SET_USER_DATA,
	LOGOUT,
	LOGIN,
	VERIFY_TOKEN,
	GET_USER_LOCATION,
	CHANGE_DURATION,
	CHANGE_RECEIVE_STATUS,
	EMIT_WAYPOINT_RECEIVE,
	SET_INTERVAL_ID,
	SET_SELECTED_DURATION,
	SET_IO_SOCKET,
	SET_INTERVAL_ALIVE,
	CREATE_ACCOUNT,
	RESEND_VERIFICATION_EMAIL
} from '../constants/constants';

export const setUserData = (data) => ({
	type: SET_USER_DATA,
	data
});

export const logout = () => ({
	type: LOGOUT
});

export const login = (data) => ({
	type: LOGIN,
	data
});

export const createAccount = (data) => ({
	type: CREATE_ACCOUNT,
	data,

});

export const resendVerifyEmail = (data) => ({
	type: RESEND_VERIFICATION_EMAIL,
	data
})

export const checkAuthToken = (navigate, screen) => ({
	type: VERIFY_TOKEN,
	navigate,
	screen
});

export const getUserLocation = () => ({
	type: GET_USER_LOCATION
});

export const changeReceiveStatus = (status) => ({
	type: CHANGE_RECEIVE_STATUS,
	receive: status

});

export const changeDuration = (tempDuration) => ({
	type: CHANGE_DURATION,
	tempDuration: tempDuration

});

export const emitWaypointReceive = (emitStatus) => ({
	type: EMIT_WAYPOINT_RECEIVE,
	emitStatus: emitStatus

});

export const setIntervalID = (timeoutID) => ({
	type: SET_INTERVAL_ID,
	timeoutID: timeoutID
});

export const setSelectedDuration = (duration) => ({
	type: SET_SELECTED_DURATION,
	duration: duration
});

export const setIOSocket = (socket) => ({
	type: SET_IO_SOCKET,
	socket: socket
});

export const setIntervalAlive = (status) => ({
	type: SET_INTERVAL_ALIVE,
	status: status
});
