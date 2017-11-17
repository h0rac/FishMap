import {takeEvery,select,put, call} from 'redux-saga/effects'
import {SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA,MOVE_TO_FISHMARK_POSITION, DELETE_FISHMARK_POSITION, LOAD_FISHMARK_POSITIONS,
    UPLOAD_FISHMARK_POSITIONS, FAILED_UPLOAD_FISHMARK_POSITIONS
} from '../constants/constants'

import {uploadFishmarkPositions} from '../actions/fishmarks'
import {AsyncStorage} from 'react-native'


//helper functions
const getToken = data => (AsyncStorage.getItem('token'))
const fetchFishmarks = params => fetch('http://localhost:3000/api/v1/waypoints', params)

function* fetchFishmarkPositions() {

    try {
        const myHeaders = new Headers();

        const token = yield call(getToken)

        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('authorization',JSON.parse(decodeURI(token)))

        let params = {
            method:'GET',
            headers: myHeaders,
        }

        const response = yield call(fetchFishmarks, params)
        const result = yield response.json()

        if(result.error) {
            yield put({type:FAILED_UPLOAD_FISHMARK_POSITIONS, error:result.error})
        }else {
            const fetchedFishmarks = yield result.waypoints
            yield put({type: UPLOAD_FISHMARK_POSITIONS, fetchedFishmarks})
        }

    }catch(e) {
       yield put({type:FAILED_UPLOAD_FISHMARK_POSITIONS, error: e.message})
    }

}

export default function* rootSaga() {
    yield takeEvery("LOAD_FISHMARK_POSITIONS", fetchFishmarkPositions)
}