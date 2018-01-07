import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import {
	FAILED_GET_USER_LOCATION, SUCCESS_GET_USER_LOCATION, EMIT_WAYPOINT_RECEIVE_STOPPED,
	EMIT_WAYPOINT_RECEIVE_STARTED, CHANGE_DURATION_SUCCESS,SUCCESS_REMOVE_TOKEN
} from '../../constants/constants';

import {removeToken, getToken} from '../../common/utils';

import { getUserPosition, getPosition, emitWaypointReceiver,changeDurationInterval, logoutUser } from '../users';

const userLocation = {
	coords: {
		latitude: 54.475408,
		longitude: 18.263086,
	}
}

const userPosition = {
	latitude: userLocation.coords.longitude,
	longitude: userLocation.coords.longitude,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};


describe('When testing user Saga getUserPosition generator function', () => {
	const it = sagaHelper(getUserPosition());

	it('should have called the getPosition function', userLocation => {
		expect(userLocation).toEqual(call(getPosition, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }));


		// It's very important to understand that the generator ran the 'call' function,
		// which only describes what it does, and that the API itself is never called.
		// This is what we are testing here: (but you don't need to test that in your own tests)
	});

});

describe('When testing user Saga emitWaypointReceiver function',() => {

	let it = sagaHelper(emitWaypointReceiver({emitStatus:true}))

	it('should execute action to stop emit on socket IO', result => {
			expect(result).toEqual(put({type:EMIT_WAYPOINT_RECEIVE_STOPPED, emitStatus:true, intervalAlive:false}))
		})

	it =  sagaHelper(emitWaypointReceiver({emitStatus:false}))

	it('should execute action to start emit on socket IO', result => {
		expect(result).toEqual(put({type:EMIT_WAYPOINT_RECEIVE_STARTED, emitStatus:false, intervalAlive:true}))
	})

})


describe('When testing user Saga changeDurationInterval function',() => {

	let it = sagaHelper(changeDurationInterval({tempDuration :1000}))

	it('should execute action to change temp Duration value', result => {
		expect(result).toEqual(put({type:CHANGE_DURATION_SUCCESS, duration:1000}))
	})

})

describe('When testing user Saga logoutOut function',() => {

	let it = sagaHelper(logoutUser())

	it('should call removeToken function', result => {
		expect(result).toEqual(call(removeToken,'token'))
	})

	it('should call get token function', result => {
		expect(result).toEqual(call(getToken, 'token'))
	})

	it('should put action to success remove token', result => {
		expect(result).toEqual(put({type:SUCCESS_REMOVE_TOKEN, message:'Token removed'}))
	})

})