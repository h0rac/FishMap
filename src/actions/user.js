import {SET_USER_DATA} from '../constants/constants'

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    data,
});