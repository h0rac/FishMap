import {SET_USER_DATA, SUCCESS_SET_TOKEN, FAILED_SET_TOKEN, FAILED_GET_USER_LOCATION, SUCCESS_GET_USER_LOCATION} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const intialState = {
    user: {},
    success:false,
    error:false,
    position:{}
}

const reducer = (state=intialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state.user = action.data};

        case SUCCESS_SET_TOKEN:
            return {
                ...state, success:action.success
            }
        case FAILED_SET_TOKEN:
            return {
                ...state, error:action.error
            }

        case SUCCESS_GET_USER_LOCATION:
            return {
                ...state, position:action.position
            }

        case FAILED_GET_USER_LOCATION:
            return {
                ...state, error:action.error
            }
        default:
            return state
    }


}

export default reducer