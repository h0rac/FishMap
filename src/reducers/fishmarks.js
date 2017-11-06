import {SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA,MOVE_TO_FISHMARK_POSITION} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const initialState= {
    fishmarks: [],
    region:{},
    selected:false,
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_FISHMARK_POSITION:
            return {
                ...state,
                fishmarks: [...state.fishmarks,action.data],


        };
        case MOVE_TO_FISHMARK_POSITION:
            return {
                ...state,
                region: action.position,
                selected:action.selected

            }

    default:
        return state
    }


}

export default reducer