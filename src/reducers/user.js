import {SET_USER_DATA, SUCCESS_SET_TOKEN, FAILED_SET_TOKEN} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const intialState = {
    user: {},
    success:false,
    error:false
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
        default:
            return state
    }


}

export default reducer