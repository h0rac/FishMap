import sagaHelper from 'redux-saga-testing';
import { call, put, select } from 'redux-saga/effects';
import {
	EMIT_WAYPOINT_RECEIVE_STOPPED, EMIT_WAYPOINT_RECEIVE_STARTED, CHANGE_DURATION_SUCCESS, SUCCESS_REMOVE_TOKEN
} from '../../constants/constants';

import { removeToken, getToken } from '../../common/utils';
import 'isomorphic-fetch';

import {
	getUserPosition, getPosition, emitWaypointReceiver, changeDurationInterval, logoutUser,
	verifyToken, selectSocket, checkTokenLife
} from '../users';

const userLocation = {
	coords: {
		latitude: 54.475408,
		longitude: 18.263086
	}
};

const userPosition = {
	latitude: userLocation.coords.longitude,
	longitude: userLocation.coords.longitude,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};


const api = url => fetch(url).then(response => {
	if (response.ok) {
		return response.json();
	} else {
		throw new Error(response.status); // for example
	}
});


describe('When testing user Saga getUserPosition generator function', () => {
	const it = sagaHelper(getUserPosition());

	it('should have called the getPosition function', userLocation => {
		expect(userLocation).toEqual(call(getPosition, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }));


		// It's very important to understand that the generator ran the 'call' function,
		// which only describes what it does, and that the API itself is never called.
		// This is what we are testing here: (but you don't need to test that in your own tests)
	});

});

describe('When testing user Saga emitWaypointReceiver function', () => {

	let it = sagaHelper(emitWaypointReceiver({ emitStatus: true }));

	it('should execute action to stop emit on socket IO', result => {
		expect(result).toEqual(put({ type: EMIT_WAYPOINT_RECEIVE_STOPPED, emitStatus: true, intervalAlive: false }));
	});

	it = sagaHelper(emitWaypointReceiver({ emitStatus: false }));

	it('should execute action to start emit on socket IO', result => {
		expect(result).toEqual(put({ type: EMIT_WAYPOINT_RECEIVE_STARTED, emitStatus: false, intervalAlive: true }));
	});

});


describe('When testing user Saga changeDurationInterval function', () => {

	let it = sagaHelper(changeDurationInterval({ tempDuration: 1000 }));

	it('should execute action to change temp Duration value', result => {
		expect(result).toEqual(put({ type: CHANGE_DURATION_SUCCESS, duration: 1000 }));
	});

});

describe('When testing user Saga logoutOut function', () => {

	let it = sagaHelper(logoutUser());

	it('should call removeToken function', result => {
		expect(result).toEqual(call(removeToken, 'token'));
	});

	it('should call get token function', result => {
		expect(result).toEqual(call(getToken, 'token'));
	});

	it('should put action to success remove token', result => {
		expect(result).toEqual(put({ type: SUCCESS_REMOVE_TOKEN, message: 'Token removed' }));
	});

});

describe('When testing user Saga verifyToken function', () => {
	const navigate = jest.fn();
	const action = {
		navigation: navigate,
		screen: 'LoginScreen'
	};

	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
	let token;


	let it = sagaHelper(verifyToken(action));


	it('should call getToken function', result => {
		expect(result).toEqual(call(getToken, 'token'));
		return token = '1234';
	});

	let params = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify({
			token: JSON.parse(decodeURI('1234'))
		})
	};


	it('should select IOSocket from user store', result => {
		expect(result).toEqual(select(selectSocket));

	});

	it('should call checkTokenLife if token is not null', result => {
		expect(result).toEqual(call(checkTokenLife, params));

	});


});