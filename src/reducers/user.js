import {
	SET_USER_DATA, SUCCESS_SET_TOKEN, FAILED_SET_TOKEN, FAILED_GET_USER_LOCATION, SUCCESS_GET_USER_LOCATION,
	VERIFY_TOKEN, SUCCESS_VERIFY_TOKEN, CHANGE_INTERVAL_TIME_SUCCESS, CHANGE_RECEIVE_STATUS, CHANGE_DISPLAY_SAVE_STATUS
} from '../constants/constants';
import {setFishmark} from "../actions/fishmarks";

const intialState = {
    user: {},
    success:false,
    error:false,
    position:{},
    message:null,
    ioSocketInterval:10000,
    receive:true,
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

      case CHANGE_RECEIVE_STATUS:
           return {
             ...state, receive:action.receive
           }

        default:
            return state
    }


}

export default reducer