import {
    SET_USER_DATA, SUCCESS_SET_TOKEN, FAILED_SET_TOKEN, FAILED_GET_USER_LOCATION, SUCCESS_GET_USER_LOCATION,
    VERIFY_TOKEN, SUCCESS_VERIFY_TOKEN
} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const intialState = {
    user: {},
    success:false,
    error:false,
    position:{},
    message:null
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
        case SUCCESS_VERIFY_TOKEN:
            return {
                ...state
            }
        default:
            return state
    }


}

export default reducer