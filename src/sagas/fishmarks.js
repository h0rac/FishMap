import {
    SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA, MOVE_TO_FISHMARK_POSITION, DELETE_FISHMARK_POSITION,
    LOAD_FISHMARKS_POSITIONS_PENDING,
    SUCCESS_LOAD_FISHMARKS_POSITIONS, FAILED_LOAD_FISHMARKS_POSITIONS, API_ENDPOINT, FAILED_SET_FISHMARK_POSITION,
    SUCCESS_SET_FISHMARK_POSITION, SET_USER_DATA, LOAD_WAYPOINTS_ON_PUSH,
    SUCCESS_UPDATE_WAYPOINTS_ON_PUSH, FAILED_UPDATE_WAYPOINT_ON_PUSH, INCREMENT_SEED,
    DELETE_WAYPOINT, FAILED_DELETE_WAYPOINT, SUCCESS_DELETE_WAYPOINT, IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST,
    IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS,
    IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_FAILED, SHARE_WAYPOINT, SHARE_WAYPOINT_FAILED, SHARE_WAYPOINT_SUCCESS
} from '../constants/constants'

import {LOAD_FISHMARKS_POSITIONS} from '../constants/constants'

import {takeEvery,select,put, call, all} from 'redux-saga/effects'
import {Alert} from "react-native";
import {displayAlert, getToken, setToken, removeToken} from "../common/utils";

const fetchFishmarks = params => fetch('http://'+API_ENDPOINT+'/api/v1/waypoints', params)
const saveFishmark = params => fetch('http://'+API_ENDPOINT+'/api/v1/waypoint', params)
const delFishmark = (latitude,longitude,params) => fetch(`http://${API_ENDPOINT}/api/v1/waypoint?latitude=${latitude}&longitude=${longitude}`,params)

const shareWaypointToUser = (params) => fetch(`http://${API_ENDPOINT}/api/v1/share/waypoint`,params)

let temp = []

function* fetchFishPositions() {

    try {
        const myHeaders = new Headers();
        const token = yield call(getToken,'token')

        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('authorization',JSON.parse(decodeURI(token)))

        let params = {
            method:'GET',
            headers: myHeaders,
        }


        yield put({type: LOAD_FISHMARKS_POSITIONS_PENDING, isFetching:true})
        const response = yield call(fetchFishmarks, params)
        const result = yield response.json()


        if(result.error) {
            yield put({type:FAILED_LOAD_FISHMARKS_POSITIONS, error:result.error})
            displayAlert('Fishmark Upload',result.error)
        }else {
            const fetchedFishmarks = yield result.waypoints
            if(fetchedFishmarks !== undefined) {
                yield put({type: SUCCESS_LOAD_FISHMARKS_POSITIONS, fetchedFishmarks, isFetching:false})
            }else {
                yield put({type:FAILED_LOAD_FISHMARKS_POSITIONS, error: result.error})
                displayAlert('Fishmark Upload','Failed to upload fishmarks')
            }
        }

    }catch(e) {
        yield put({type:FAILED_LOAD_FISHMARKS_POSITIONS, error: e.message})
    }

}

function* setFishmarkPosition(action) {

    try {
        const myHeaders = new Headers();
        const token = yield call(getToken,'token')

        myHeaders.append('Content-Type', 'application/json')

        let params = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                token:JSON.parse(decodeURI(token)),
                waypoint:action.data
            })
        }
        const response = yield call(saveFishmark, params)
        const result = yield response.json()


        if(result.success === false) {
            yield put({type:FAILED_SET_FISHMARK_POSITION, error:result.message})
            displayAlert("Waypoint", result.message)
        }else {
            if(action.data !== undefined) {
                yield put({type:SUCCESS_SET_FISHMARK_POSITION, newPosition:action.data, message:result.message})
            } else {
                displayAlert("Fishmark Set", "Failed to set fishmark")
            }
        }


    }catch (e) {
        yield put({type:FAILED_SET_FISHMARK_POSITION, error: e.message})
        displayAlert("Waypoint", e.message)
    }
}

export function* delFishmarkPosition(action) {

    try {
        const myHeaders = new Headers();
        const token = yield call(getToken,'token')

        myHeaders.append('Content-Type', 'application/json')

        let params = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
                token:JSON.parse(decodeURI(token)),
                waypoint:action.position
            })
        }

        const response = yield call(delFishmark,action.position.latitude, action.position.longitude, params)
        const result = yield response.json()

        if(result.success === false) {
            yield put({type:FAILED_DELETE_WAYPOINT, error:result.message})
            displayAlert("Waypoint", result.message)
        }else {
            if(action.position !== undefined) {
                yield put({type: SUCCESS_DELETE_WAYPOINT, position:action.position, message:result.message})
            } else {
                displayAlert("Fishmark Set", "Failed to delete fishmark")
            }
        }

    }catch (e) {
        yield put({type:FAILED_DELETE_WAYPOINT, error:result.message})
        displayAlert("Waypoint", result.message)
    }
}

function* loadWaypointsOnPush(action) {

    try {

        let loadedWaypoints = yield select(state => state.fishmarks.loadedWaypoints)
        const fishmarks = yield select(state => state.fishmarks.fishmarks)
        const seed = yield select(state => state.fishmarks.seed)

        if(loadedWaypoints.length !== fishmarks.length) {
            loadedWaypoints = fishmarks.filter((waypoint, index) => index <= seed).reverse()
            yield put({type:SUCCESS_UPDATE_WAYPOINTS_ON_PUSH, loadedWaypoints, refreshing:true})
            yield put({type:INCREMENT_SEED, seed:seed+5, refreshing:false})

        }
        else {
            displayAlert('Waypoint', 'No more waypoints to load')
        }

    }catch (e) {
        yield put({type:FAILED_UPDATE_WAYPOINT_ON_PUSH, error:e.message})
    }
}

function removeDuplicates(arr, prop) {
    let new_arr = [];
    let lookup  = {};

    for (let i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (let i in lookup) {
        new_arr.push(lookup[i]);
    }

    return new_arr;
}

function* IOCreateCandidateFishmarksList (action) {

    try {
        const currentCandidateFishmarks = yield select(state => state.fishmarks.sharedFishmarks)
        const allFishmarks = yield select(state => state.fishmarks.fishmarks)


        temp = action.waypoints

        console.log("RECEIVED WAYPOINTS", temp)

        const filteredFishmarks = removeDuplicates(temp,'key')

        yield put({type:IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS, sharedFishmarksNumber:filteredFishmarks.length, sharedFishmarks:filteredFishmarks})

       console.log("PROBA", currentCandidateFishmarks)


    } catch(e) {
        yield put({type:IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_FAILED, message:e.error})
    }


}

function* shareWaypoint (action) {

    console.log("SHARE", action.id)

        const myHeaders = new Headers();
        const token = yield call(getToken,'token')

        myHeaders.append('Content-Type', 'application/json')

        let params = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                token:JSON.parse(decodeURI(token)),
                wId:action.id,
                email:'joanna@test.com'
            })
        }

        const response = yield call(shareWaypointToUser, params)
        const result = yield response.json()

        if(result.success === false) {
            yield put({type:SHARE_WAYPOINT_FAILED, error:result.message})
            displayAlert("Waypoint", result.message)
        }else {
                yield put({type: SHARE_WAYPOINT_SUCCESS, message:result.message})

        }
}


export const fishmarkSaga = [

    takeEvery("SET_FISHMARK_POSITION", setFishmarkPosition),
    takeEvery("LOAD_FISHMARKS_POSITIONS", fetchFishPositions),
    takeEvery("LOAD_WAYPOINTS_ON_PUSH", loadWaypointsOnPush),
    takeEvery("DELETE_FISHMARK_POSITION", delFishmarkPosition),
    takeEvery("IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST", IOCreateCandidateFishmarksList),
    takeEvery("SHARE_WAYPOINT", shareWaypoint)

    ]