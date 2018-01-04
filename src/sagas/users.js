import {
	API_ENDPOINT,
	FAILED_GET_USER_LOCATION,
	FAILED_SET_TOKEN,
	SUCCESS_GET_USER_LOCATION,
	SUCCESS_SET_TOKEN,
	SUCCESS_REMOVE_TOKEN,
	FAILED_REMOVE_TOKEN,
	GET_USER_LOCATION,
	CHANGE_RECEIVE_STATUS,
	EMIT_WAYPOINT_RECEIVE,
	EMIT_WAYPOINT_RECEIVE_STOPPED,
	EMIT_WAYPOINT_RECEIVE_STARTED,
	CHANGE_DURATION_SUCCESS

} from '../constants/constants';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { AsyncStorage, Dimensions } from 'react-native';
import { displayAlert, getToken, setToken, removeToken } from '../common/utils';

import SocketIOClient from "socket.io-client";
import { setIOSocket } from '../actions/user';


const authenticateUser = params => fetch('http://' + API_ENDPOINT + '/api/v1/login', params);
const checkTokenLife = params => fetch(`http://${API_ENDPOINT}/api/v1/verify`,params)


const getPosition = (options) => {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DETLTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DETLTA;


function* getUserPosition() {

	try {
		//TODO enableHighAccuracy false in indoor, set to true when outdoor, false only for tests
		const userLocation = yield call(getPosition, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });

		const userPosition = {
			latitude: userLocation.coords.latitude,
			longitude: userLocation.coords.longitude,
			latitudeDelta: LATITUDE_DETLTA,
			longitudeDelta: LONGITUDE_DELTA
		};

		if (userLocation) {
			yield put({ type: SUCCESS_GET_USER_LOCATION, position: userPosition });
		} else {
			yield put({ type: FAILED_GET_USER_LOCATION, error: 'FAILED TO GET USER LOCATION' });
		}
	} catch (e) {
		yield put({ type: FAILED_GET_USER_LOCATION, error: e });
	}
}


function* logoutUser(action) {
	try {

		yield call(removeToken, 'token');
		const test = yield call(getToken, 'token');
		if (!test) {
			yield put({ type: SUCCESS_REMOVE_TOKEN, message: 'Token removed' });

		}
	} catch (e) {
		yield put({ type: FAILED_REMOVE_TOKEN, message: e.error });
	}
}

function* loginUser(action) {

	try {
		const myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/json');

		let params = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				email: action.data.email,
				password: action.data.password
			})
		};
		const response = yield call(authenticateUser, params);
		const result = yield response.json();


		if (result.success === false) {
			yield put({ type: FAILED_SET_TOKEN, error: result.message });
			displayAlert('Login', result.message);
		} else {

			yield setToken(result.token);

			const token = yield call(getToken, 'token');
			if (token && JSON.parse(decodeURI(token))) {
				this.ioSocket =  SocketIOClient(`ws://${API_ENDPOINT}`, { jsonp: false , transports: ['websocket'], pingTimeout:30000 } );
				yield put({ type: SUCCESS_SET_TOKEN, message: result.message, socketIO: this.ioSocket });
				action.data.navigation.navigate('MainScreen');
			}
		}

	} catch (e) {
		yield put({ type: FAILED_SET_TOKEN, error: e.message });
		displayAlert('Login', e.message);
	}
}

function* verifyToken(action) {
	const token = yield call(getToken, 'token');
	const socketIO = yield select(state => state.user.socketIO)
	console.log("TOKEN", token)

	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');

	let params = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify({
			token: token ? JSON.parse(decodeURI(token)) :null
		})
	};
	let response;
	if(token !== null) {
		response = yield call(checkTokenLife, params)
	}else {
		if (action.screen !== 'LoginScreen') {
			action.navigate.navigate('LoginScreen');
		}
	}
	const result = yield response ?  response.json(): null

	console.log("RESULT", result)

	let socket = null;
	if (result && result.success) {
		if(!socketIO) {
			socket =  SocketIOClient(`ws://${API_ENDPOINT}`, { jsonp: false , transports: ['websocket'] }, );
			yield put({ type: SUCCESS_SET_TOKEN, message: result.message, socketIO: socket });
		}
		action.navigate.navigate('MainScreen');
	} else {
		if(socket) {
			socket.emit('onErrorDisconnect')
		}
		if (action.screen !== 'LoginScreen') {
			action.navigate.navigate('LoginScreen');

		}
	}
}

function* emitWaypointReceiver(action) {

	if (action.emitStatus) {
		yield put({
			type: 'EMIT_WAYPOINT_RECEIVE_STOPPED',
			emitStatus: true,
			intervalAlive:false
		});
	} else {
		if (!action.emitStatus) {
			yield put({type: 'EMIT_WAYPOINT_RECEIVE_STARTED', emitStatus: false, intervalAlive:true})
		}
	}
}

function *changeDurationInterval(action) {
	if(action.tempDuration) {
		yield put({type:CHANGE_DURATION_SUCCESS, duration:action.tempDuration})
	}
}

export const usersSaga = [
	takeEvery('GET_USER_LOCATION', getUserPosition),
	takeEvery('LOGIN', loginUser),
	takeEvery('VERIFY_TOKEN', verifyToken),
	takeEvery('LOGOUT', logoutUser),
	takeEvery('EMIT_WAYPOINT_RECEIVE', emitWaypointReceiver),
	takeEvery('CHANGE_DURATION',changeDurationInterval)
];