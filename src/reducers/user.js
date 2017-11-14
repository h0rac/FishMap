import {SET_USER_DATA} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const intialState = {
    user: {}
}


const reducer = (state=intialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state.user = action.data};

        default:
            return state
    }


}

export default reducer