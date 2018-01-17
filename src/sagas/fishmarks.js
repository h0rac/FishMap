import {
	SET_FISHMARK_POSITION,
	UPDATE_FISHMARK_DATA,
	MOVE_TO_FISHMARK_POSITION,
	DELETE_FISHMARK_POSITION,
	LOAD_FISHMARKS_POSITIONS_PENDING,
	SUCCESS_LOAD_FISHMARKS_POSITIONS,
	FAILED_LOAD_FISHMARKS_POSITIONS,
	API_ENDPOINT,
	FAILED_SET_FISHMARK_POSITION,
	SUCCESS_SET_FISHMARK_POSITION,
	SET_USER_DATA,
	LOAD_WAYPOINTS_ON_PUSH,
	SUCCESS_UPDATE_WAYPOINTS_ON_PUSH,
	FAILED_UPDATE_WAYPOINT_ON_PUSH,
	INCREMENT_SEED,
	DELETE_WAYPOINT,
	FAILED_DELETE_WAYPOINT,
	SUCCESS_DELETE_WAYPOINT,
	IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST,
	IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS,
	IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_FAILED,
	SHARE_WAYPOINT,
	SHARE_WAYPOINT_FAILED,
	SHARE_WAYPOINT_SUCCESS,
	SHARE_WAYPOINT_CHECKED,
	SHARE_WAYPOINT_CHECKED_SUCCESS,
	SHARE_WAYPOINT_CHECKED_FAILED,
	SHARE_WAYPOINT_ALL_SELECTED,
	SHARE_WAYPOINT_CHECKED_FALSE,
	SHARE_WAYPOINT_CHECKED_CLEAR,
	SHARE_WAYPOINT_CHECKED_CLEAR_SUCCESS,
	CHANGE_DURATION,
	CHANGE_RECEIVE_STATUS,
	SAVE_SHARED_WAYPOINTS,
	UPDATE_WAYPOINT_ON_SAVE_SUCCESS,
	UPDATE_WAYPOINT_ON_SAVE_FAILED,
	CHANGE_DISPLAY_SAVE_STATUS
} from '../constants/constants';

import { LOAD_FISHMARKS_POSITIONS } from '../constants/constants';

import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { displayAlert, getToken, setToken, removeToken, removeDuplicates } from '../common/utils';

const fetchFishmarks = params => fetch('http://' + API_ENDPOINT + '/api/v1/waypoints', params);
const saveFishmark = params => fetch('http://' + API_ENDPOINT + '/api/v1/waypoint', params);
const delFishmark = (latitude, longitude, params) => fetch(`http://${API_ENDPOINT}/api/v1/waypoint?latitude=${latitude}&longitude=${longitude}`, params);
const fetchFishmark = (latitude, longitude, params) => fetch(`http://${API_ENDPOINT}/api/v1/waypoint?latitude=${latitude}&longitude=${longitude}`, params);


const shareWaypointToUser = (params) => fetch(`http://${API_ENDPOINT}/api/v1/share/waypoint`, params);
const saveFishmarks = params => fetch(`http://${API_ENDPOINT}/api/v1/save/waypoints`, params);

let temp = [];
let selectedWaypoints = [];
let filteredSharedWaypoints = [];

function* fetchFishPositions() {

	try {
		const myHeaders = new Headers();
		const token = yield call(getToken, 'token');

		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('authorization', JSON.parse(decodeURI(token)));

		let params = {
			method: 'GET',
			headers: myHeaders
		};


		yield put({ type: LOAD_FISHMARKS_POSITIONS_PENDING, isFetching: true });
		const response = yield call(fetchFishmarks, params);
		const result = yield response.json();


		if (result.error) {
			yield put({ type: FAILED_LOAD_FISHMARKS_POSITIONS, error: result.error });
			displayAlert('Fishmark Upload', result.error);
		} else {
			const fetchedFishmarks = yield result.waypoints;
			if (fetchedFishmarks !== undefined) {
				yield put({ type: SUCCESS_LOAD_FISHMARKS_POSITIONS, fetchedFishmarks, isFetching: false });
			} else {
				yield put({ type: FAILED_LOAD_FISHMARKS_POSITIONS, error: result.error });
				displayAlert('Fishmark Upload', 'Failed to upload fishmarks');
			}
		}

	} catch (e) {
		yield put({ type: FAILED_LOAD_FISHMARKS_POSITIONS, error: e.message });
	}

}

function* setFishmarkPosition(action) {

	try {
		const myHeaders = new Headers();
		const token = yield call(getToken, 'token');

		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('x-api-key', JSON.parse(decodeURI(token)));

		let params = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				token: JSON.parse(decodeURI(token)),
				waypoint: action.data
			})
		};
		const response = yield call(saveFishmark, params);
		const result = yield response.json();


		if (result.success === false) {
			yield put({ type: FAILED_SET_FISHMARK_POSITION, error: result.message });
			displayAlert('Waypoint', result.message);
		} else {
			if (action.data !== undefined) {

				let fetchParams = {
					method: 'GET',
					headers: myHeaders
				};
				const fetchResponse = yield call(fetchFishmark, action.data.latitude, action.data.longitude, fetchParams);
				const fetchResult = yield fetchResponse.json();

				console.log('FETCH RESULT', fetchResult);

				if (fetchResult.success === false) {
					//yield put({ type: FAILED_GET_WAYPOINT, error: result.message });
					displayAlert('Waypoint', fetchResult.message);
				} else {
					yield put({
						type: SUCCESS_SET_FISHMARK_POSITION,
						newPosition: fetchResult.waypoint,
						message: fetchResult.message
					});
				}
			}
		}
	} catch (e) {
		yield put({ type: FAILED_SET_FISHMARK_POSITION, error: e.message });
		displayAlert('Waypoint', e.message);
	}
}

export function* delFishmarkPosition(action) {

	try {
		const myHeaders = new Headers();
		const token = yield call(getToken, 'token');

		myHeaders.append('Content-Type', 'application/json');

		let params = {
			method: 'DELETE',
			headers: myHeaders,
			body: JSON.stringify({
				token: JSON.parse(decodeURI(token)),
				waypoint: action.position
			})
		};

		const response = yield call(delFishmark, action.position.latitude, action.position.longitude, params);
		const result = yield response.json();

		if (result.success === false) {
			yield put({ type: FAILED_DELETE_WAYPOINT, error: result.message });
			displayAlert('Waypoint', result.message);
		} else {
			if (action.position !== undefined) {
				yield put({ type: SUCCESS_DELETE_WAYPOINT, position: action.position, message: result.message });
			} else {
				displayAlert('Fishmark Set', 'Failed to delete fishmark');
			}
		}

	} catch (e) {
		yield put({ type: FAILED_DELETE_WAYPOINT, error: result.message });
		displayAlert('Waypoint', result.message);
	}
}

function* loadWaypointsOnPush(action) {

	try {

		let loadedWaypoints = yield select(state => state.fishmarks.loadedWaypoints);
		const fishmarks = yield select(state => state.fishmarks.fishmarks);
		const seed = yield select(state => state.fishmarks.seed);

		console.log("LOADED WAYPOINTS", loadedWaypoints)
		console.log("FISHMARKS WAYPOINTS", fishmarks)

		if (loadedWaypoints.length !== fishmarks.length) {
			loadedWaypoints = fishmarks.filter((waypoint, index) => index <= seed).reverse();
			yield put({ type: SUCCESS_UPDATE_WAYPOINTS_ON_PUSH, loadedWaypoints:loadedWaypoints, refreshing: true });
			yield put({ type: INCREMENT_SEED, seed: seed + 5, refreshing: false });

		}
		else {
			displayAlert('Waypoint', 'No more waypoints to load');
		}

	} catch (e) {
		yield put({ type: FAILED_UPDATE_WAYPOINT_ON_PUSH, error: e.message });
	}
}


function* IOCreateCandidateFishmarksList(action) {

	try {

		temp = action.waypoints.map(item => {
			return { ...item, checked: false };
		});

		const filteredFishmarks = removeDuplicates(temp, 'key');

		console.log('filtered', filteredFishmarks);

		yield put({
			type: IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS,
			sharedFishmarksNumber: filteredFishmarks.length,
			sharedFishmarks: filteredFishmarks
		});

	} catch (e) {
		yield put({ type: IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_FAILED, message: e.error });
	}


}

function* shareWaypoint(action) {

	const myHeaders = new Headers();
	const token = yield call(getToken, 'token');

	myHeaders.append('Content-Type', 'application/json');

	let params = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify({
			token: JSON.parse(decodeURI(token)),
			wId: action.id,
			email: 'horac26@gmail.com'
		})
	};

	const response = yield call(shareWaypointToUser, params);
	const result = yield response.json();

	if (result.success === false) {
		yield put({ type: SHARE_WAYPOINT_FAILED, error: result.message });
		displayAlert('Waypoint', result.message);
	} else {
		yield put({ type: SHARE_WAYPOINT_SUCCESS, message: result.message });

	}
}

function* shareWaypointChecked(action) {

	try {
		let number = yield select(state => state.fishmarks.sharedFishmarksNumber);
		const selectedSharedFishmarks = yield select(state => state.fishmarks.selectedSharedFishmarks);

		console.log("ACTION CHECKED", action.checked)
		console.log("ACTION ALIVE", action.intervalAlive)

		if (!action.checked) {
				yield put({ type: CHANGE_RECEIVE_STATUS, receive: false });

			yield put({
				type: SHARE_WAYPOINT_CHECKED_SUCCESS,
				number: --number,
				target: { ...action.target, checked: !action.checked },
				selectedSharedFishmarks: removeDuplicates([...selectedSharedFishmarks, {
					...action.target,
					checked: !action.checked
				}], 'key')
			});
		} else {

			yield put({
				type: SHARE_WAYPOINT_CHECKED_FALSE,
				number: ++number,
				selectedSharedFishmark: { ...action.target, checked: !action.checked }
			});
			if(action.intervalAlive)
				yield put({ type: CHANGE_RECEIVE_STATUS, receive: true });
		}

	} catch (e) {
		yield put({ type: SHARE_WAYPOINT_CHECKED_FAILED, message: e });
	}
}

function* saveSharedWaypoints(action) {

	try {
		temp = action.waypoints.map(item => {
			delete item.checked;
			return item;
		});

		const allWaypoints = yield  select(state => state.fishmarks.fishmarks);
		const sharedWaypoints = yield select(state => state.fishmarks.sharedFishmarks);


		temp.forEach(waypoint => {
			sharedWaypoints = sharedWaypoints.filter(item => item.key !== waypoint.key);
		});

		const updatedWaypoints = removeDuplicates(allWaypoints.concat(temp), 'key');


		const myHeaders = new Headers();
		const token = yield call(getToken, 'token');

		myHeaders.append('Content-Type', 'application/json');

		let params = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				token: JSON.parse(decodeURI(token)),
				waypoints: updatedWaypoints
			})
		};
		const response = yield call(saveFishmarks, params);
		const result = yield response.json();

		if (result.success === false) {
			yield put({ type: UPDATE_WAYPOINT_ON_SAVE_FAILED, error: result.message });
			displayAlert('Waypoint', result.message);
		} else {
			yield put({
				type: UPDATE_WAYPOINT_ON_SAVE_SUCCESS, toSaveWaypoints: updatedWaypoints,
				filteredSharedWaypoints: sharedWaypoints
			});
			yield put({ type: CHANGE_RECEIVE_STATUS, receive: true });
		}
	} catch (e) {
		yield put({ type: UPDATE_WAYPOINT_ON_SAVE_FAILED, error: result.message });
	}
}

export const fishmarkSaga = [

	takeEvery('SET_FISHMARK_POSITION', setFishmarkPosition),
	takeEvery('LOAD_FISHMARKS_POSITIONS', fetchFishPositions),
	takeEvery('LOAD_WAYPOINTS_ON_PUSH', loadWaypointsOnPush),
	takeEvery('DELETE_FISHMARK_POSITION', delFishmarkPosition),
	takeEvery('IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST', IOCreateCandidateFishmarksList),
	takeEvery('SHARE_WAYPOINT', shareWaypoint),
	takeEvery('SHARE_WAYPOINT_CHECKED', shareWaypointChecked),
	takeEvery('SAVE_SHARED_WAYPOINTS', saveSharedWaypoints)
];