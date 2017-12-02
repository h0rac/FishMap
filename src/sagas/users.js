import {
    API_ENDPOINT, FAILED_GET_USER_LOCATION, FAILED_SET_TOKEN, SUCCESS_GET_USER_LOCATION,
    SUCCESS_SET_TOKEN,SUCCESS_REMOVE_TOKEN, FAILED_REMOVE_TOKEN, GET_USER_LOCATION
} from "../constants/constants";
import {call, put, takeEvery} from "redux-saga/effects";
import {AsyncStorage, Dimensions} from "react-native";
import {displayAlert, getToken, setToken, removeToken} from "../common/utils";


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


function* logoutUser(action) {
    try {

        yield call(removeToken, 'token')
        const test = yield call(getToken, 'token')
        if (!test) {
            yield put({type: SUCCESS_REMOVE_TOKEN, message: "Token removed"})
        }
    }catch(e) {
        yield put({type:FAILED_REMOVE_TOKEN, message:e.error})
    }
}

function* loginUser(action) {

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


        if(result.success === false) {
            yield put({type:FAILED_SET_TOKEN, error:result.message})
            displayAlert('Login', result.message)
        }else {

            yield setToken(result.token);

            const token = yield call(getToken,'token')

            if(token && JSON.parse(decodeURI(token))) {
                yield put({type: SUCCESS_SET_TOKEN, message:result.message})
                action.data.navigation.navigate('MainScreen')
            }
        }

    }  catch (e) {
        yield put({type:FAILED_SET_TOKEN, error: e.message})
        displayAlert('Login', e.message)
    }
}

function* verifyToken(action) {
    const token = yield call(getToken,'token')

    if(token && JSON.parse(decodeURI(token))) {
        action.navigate.navigate('MainScreen')
    }else {
    }

}

export const usersSaga = [
    takeEvery("GET_USER_LOCATION", getUserPosition),
    takeEvery("LOGIN", loginUser),
    takeEvery("VERIFY_TOKEN", verifyToken),
    takeEvery("LOGOUT", logoutUser)
    ]