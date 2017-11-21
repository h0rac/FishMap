import {SET_USER_DATA, LOGOUT, LOGIN, VERIFY_TOKEN} from '../constants/constants'

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    data,
});

export const logout =() => ({
    type:LOGOUT
})

export const login = (data) => ({
    type:LOGIN,
    data
})

export const checkAuthToken = (navigate) => ({
    type: VERIFY_TOKEN,
    navigate
})