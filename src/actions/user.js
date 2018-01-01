import {
	SET_USER_DATA,
	LOGOUT,
	LOGIN,
	VERIFY_TOKEN,
	GET_USER_LOCATION,
	CHANGE_DURATION,
	CHANGE_RECEIVE_STATUS,
	EMIT_WAYPOINT_RECEIVE,
	SET_TIMEOUT_ID,
	SET_SELECTED_DURATION,
	SET_IO_SOCKET
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
	data,

});

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

export const changeDuration = () => ({
	type: CHANGE_DURATION,

});

export const emitWaypointReceive = (emitStatus) => ({
	type:EMIT_WAYPOINT_RECEIVE,
	emitStatus: emitStatus,

});

export const setTimeoutId = (id) => ({
	type:SET_TIMEOUT_ID,
	id:id
})

export const setSelectedDuration = (duration) => ({
	type: SET_SELECTED_DURATION,
	duration: duration
})

export const setIOSocket = (socket) => ({
	type: SET_IO_SOCKET,
	socket:socket
})
