import {
    SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA, MOVE_TO_FISHMARK_POSITION, DELETE_FISHMARK_POSITION,
    LOAD_POSITIONS, UPLOAD_FISHMARK_POSITIONS, FAILED_UPLOAD_FISHMARK_POSITIONS, SUCCESS_SET_FISHMARK_POSITION,
    FAILED_SET_FISHMARK_POSITION,SUCCESS_UPLOAD_FISHMARK_POSITIONS, SUCCESS_UPDATE_WAYPOINTS_ON_PUSH, FAILED_UPDATE_WAYPOINT_ON_PUSH,
    FINISHED_UPDATE_WAYPOINTS_ON_PUSH
} from '../constants/constants'

const initialState= {
    fishmarks: [],
    region:{},
    selected:false,
    error:null,
    isFetching:false,
    message:null,
    refreshing:false,
    loadedWaypoints:[],
    seed:4
}


const reducer = (state=initialState, action) => {
    switch(action.type) {

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

            return {...state, fishmarks: action.fetchedFishmarks, isFetching:action.isFetching};


        case SUCCESS_UPLOAD_FISHMARK_POSITIONS:
            return {...state, isFetching:false}


        case FAILED_UPLOAD_FISHMARK_POSITIONS:
            return {...state, error: action.error, isFetching:false}

        case SUCCESS_SET_FISHMARK_POSITION:
            return {...state, fishmarks:[...state.fishmarks,action.data], message: action.message}

        case FAILED_SET_FISHMARK_POSITION:
            return {...state, error: action.error}

        case SUCCESS_UPDATE_WAYPOINTS_ON_PUSH:
            return {...state, loadedWaypoints:action.loadedWaypoints, refreshing:action.refreshing}

        case FINISHED_UPDATE_WAYPOINTS_ON_PUSH:
            return {...state, seed:action.seed, refreshing:action.refreshing}

    default:
        return state
    }


}

export default reducer