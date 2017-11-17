import {
    SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA, MOVE_TO_FISHMARK_POSITION, DELETE_FISHMARK_POSITION,
    LOAD_FISHMARK_POSITIONS, UPLOAD_FISHMARK_POSITIONS, FAILED_UPLOAD_FISHMARK_POSITIONS
} from '../constants/constants'
import {setFishmark} from "../actions/fishmarks";

const initialState= {
    fishmarks: [],
    region:{},
    selected:false,
    error:null,
    isFetching:true,
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_FISHMARK_POSITION:
            return {...state,fishmarks:[...state.fishmarks,action.data]};

        case MOVE_TO_FISHMARK_POSITION:
            return {
                ...state,
                region: action.position,
                selected:action.selected

            }
        case DELETE_FISHMARK_POSITION:
            return {
                ...state,fishmarks:[...state.fishmarks.filter(mark => mark.longitude != action.position.longitude
                || mark.latitude != action.position.latitude)]
            }
        case UPLOAD_FISHMARK_POSITIONS:

            return {...state, fishmarks: action.fetchedFishmarks, isFetching:false};

        case FAILED_UPLOAD_FISHMARK_POSITIONS:
            return {...state, error: action.error}

    default:
        return state
    }


}

export default reducer