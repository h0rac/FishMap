import {takeEvery,select,put, call, all} from 'redux-saga/effects'
import {Dimensions} from 'react-native'

import {SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA,MOVE_TO_FISHMARK_POSITION, DELETE_FISHMARK_POSITION, LOAD_POSITIONS,
    UPLOAD_FISHMARK_POSITIONS, FAILED_UPLOAD_FISHMARK_POSITIONS, API_ENDPOINT, FAILED_SET_FISHMARK_POSITION, SUCCESS_FISHMARK_POSITION
    , SUCCESS_UPLOAD_FISHMARK_POSITIONS, LOGOUT, LOGIN, SUCCESS_SET_TOKEN, FAILED_SET_TOKEN, SET_USER_DATA, VERIFY_TOKEN,
    SUCCESS_GET_USER_LOCATION, FAILED_GET_USER_LOCATION, GET_USER_LOCATION
} from '../constants/constants'

import {AsyncStorage} from 'react-native'


//helper functions
const getToken = token => (AsyncStorage.getItem(token))
const removeToken = (token) => (AsyncStorage.removeItem(token))
const setToken = (token) => AsyncStorage.setItem('token',JSON.stringify(token))
const fetchFishmarks = params => fetch('http://'+API_ENDPOINT+'/api/v1/waypoints', params)
const saveFishmark = params => fetch('http://'+API_ENDPOINT+'/api/v1/waypoint', params)
const delFishmark = (id,params) => fetch(`'http://'+${API_ENDPOINT}+'/api/v1/waypoint?id=${id}'`,params)

const authenticateUser = params=> fetch('http://'+API_ENDPOINT+'/api/v1/login', params)


const getPosition = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width /height;

const LATITUDE_DETLTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DETLTA


function* getUserPosition() {

    try {
        //TODO enableHighAccuracy false in indoor, set to true when outdoor, false only for tests
        const userLocation = yield call(getPosition, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000})
        console.log("TEST USER LOC", userLocation)


        const userPosition = {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: LATITUDE_DETLTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        if (userLocation) {
            yield put({type: SUCCESS_GET_USER_LOCATION, position: userPosition})
        } else {
            yield put({type: FAILED_GET_USER_LOCATION, error: "FAILED TO GET USER LOCATION"})
        }
    }catch(e) {
            yield put({type:FAILED_GET_USER_LOCATION, error:e})
    }
}


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

        const response = yield call(fetchFishmarks, params)
        const result = yield response.json()

        if(result.error) {
            yield put({type:FAILED_UPLOAD_FISHMARK_POSITIONS, error:result.error})
        }else {
            const fetchedFishmarks = yield result.waypoints
            yield put({type: UPLOAD_FISHMARK_POSITIONS, fetchedFishmarks, isFetching:true})
            yield put({type: SUCCESS_UPLOAD_FISHMARK_POSITIONS, isFetching:false})
        }

    }catch(e) {
       yield put({type:FAILED_UPLOAD_FISHMARK_POSITIONS, error: e.message})
    }

}

function* setFishmarkPosition(action) {
    console.log("Test setFishmarkPosition generator", action)

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

        console.log("RESULT FISHMARK", result)

        if(result.success === false) {
            yield put({type:FAILED_SET_FISHMARK_POSITION, error:result.message})
        }else {
            yield put({type: SUCCESS_FISHMARK_POSITION, message:result.message})
        }



    }catch (e) {
        yield put({type:FAILED_SET_FISHMARK_POSITION, error: e.message})
    }
}

function* delFishmarkPosition(action) {
    yield;
}

function* logoutUser(action) {
    console.log("test logout", action)
    yield call(removeToken,'token')
    const test = yield call(getToken,'token')
    console.log("Do we have token ?", test)
}

function* loginUser(action) {

      console.log("IN LOGIN USER", action.data)

    try  {
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json')

        let params = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                email:action.data.email,
                password:action.data.password
            })
        }
        const response = yield call(authenticateUser, params)
        const result = yield response.json()

        console.log("RESULT LOGIN", result)

        if(result.success === false) {
            yield put({type:FAILED_SET_TOKEN, error:result.message})
        }else {

            yield setToken(result.token);

            const token = yield call(getToken,'token')

            if(token && JSON.parse(decodeURI(token))) {
                yield put({type: SUCCESS_SET_TOKEN, message:result.message})
                console.log("ACTION", action.data)
                action.data.navigation.navigate('MainScreen')
            }
        }

    }  catch (e) {
        yield put({type:FAILED_SET_TOKEN, error: e.message})
    }
}

function* verifyToken(action) {
    const token = yield call(getToken,'token')

    console.log("IN VERIFY", action.navigate)
    if(token && JSON.parse(decodeURI(token))) {
        action.navigate.navigate('MainScreen')
    }else {
    }

}



export default function* rootSaga() {

    yield takeEvery("GET_USER_LOCATION", getUserPosition)
    yield takeEvery("LOAD_POSITIONS", fetchFishPositions)
    yield takeEvery("SET_FISHMARK_POSITION", setFishmarkPosition)
    yield takeEvery("LOGIN", loginUser)
    yield takeEvery("VERIFY_TOKEN", verifyToken)
    yield takeEvery("LOGOUT", logoutUser)

}