import {
	SET_FISHMARK_POSITION,
	UPDATE_FISHMARK_DATA,
	MOVE_TO_FISHMARK_POSITION,
	DELETE_FISHMARK_POSITION,
	LOAD_FISHMARKS_POSITIONS_PENDING,
	SUCCESS_LOAD_FISHMARKS_POSITIONS,
	FAILED_LOAD_FISHMARKS_POSITIONS,
	SUCCESS_SET_FISHMARK_POSITION,
	FAILED_SET_FISHMARK_POSITION,
	SUCCESS_UPDATE_WAYPOINTS_ON_PUSH,
	FAILED_UPDATE_WAYPOINT_ON_PUSH,
	INCREMENT_SEED,
	SUCCESS_DELETE_WAYPOINT,
	FAILED_DELETE_WAYPOINT,
	IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_FAILED,
	IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS,
	SHARE_WAYPOINT_CHECKED_SUCCESS,
	SHARE_WAYPOINT_CHECKED_FAILED,
	SHARE_WAYPOINT_ALL_SELECTED,
	SHARE_WAYPOINT_CHECKED_FALSE,
	SHARE_WAYPOINT_CHECKED_CLEAR_SUCCESS,
	SHARE_WAYPOINT_CHECKED_CLEAR, UPDATE_WAYPOINT_ON_SAVE_SUCCESS,
	UPDATE_WAYPOINT_ON_SAVE_FAILED

} from '../constants/constants';

import { removeDuplicates } from '../common/utils';

const initialState = {
	fishmarks: [],
	region: {},
	selected: false,
	error: null,
	isFetching: false,
	message: null,
	refreshing: false,
	loadedWaypoints: [],
	sharedFishmarks: [],
	selectedSharedFishmarks: [],
	copiedSharedFishmarks: [],
	selectedSharedFishmark: {},
	sharedFishmarksNumber: 0,
	seed: 5,
	allSelected: false,
	displaySave: false,
	cleared: false
};


const reducer = (state = initialState, action) => {
	switch (action.type) {

		case MOVE_TO_FISHMARK_POSITION:
			return {
				...state,
				region: action.position,
				selected: action.selected

			};
		case SUCCESS_DELETE_WAYPOINT:
			return {
				...state, fishmarks: [...state.fishmarks.filter(mark => mark.latitude !== action.position.latitude
					&& mark.longitude !== action.position.longitude
				)]
			};

		case FAILED_DELETE_WAYPOINT:
			return { ...state, error: action.error };

		case SUCCESS_LOAD_FISHMARKS_POSITIONS:

			return { ...state, fishmarks: action.fetchedFishmarks, isFetching: action.isFetching };

		case LOAD_FISHMARKS_POSITIONS_PENDING:
			return { ...state, isFetching: false };

		case FAILED_LOAD_FISHMARKS_POSITIONS:
			return { ...state, error: action.error, isFetching: false };

		case SUCCESS_SET_FISHMARK_POSITION:
			return { ...state, fishmarks: [...state.fishmarks, action.newPosition], message: action.message };

		case UPDATE_WAYPOINT_ON_SAVE_SUCCESS:
			return {...state, fishmarks: action.toSaveWaypoints, sharedFishmarks:action.filteredSharedWaypoints}

		case UPDATE_WAYPOINT_ON_SAVE_FAILED:
			return {...state, message:action.message}

		case FAILED_SET_FISHMARK_POSITION:
			return { ...state, error: action.error };

		case SUCCESS_UPDATE_WAYPOINTS_ON_PUSH:
			return { ...state, loadedWaypoints: action.loadedWaypoints, refreshing: action.refreshing };

		case INCREMENT_SEED:
			return { ...state, seed: action.seed, refreshing: action.refreshing };

		case FAILED_UPDATE_WAYPOINT_ON_PUSH:
			return { ...state, error: action.error };

		case IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST_SUCCESS:
			return {

				...state, sharedFishmarks: action.sharedFishmarks, sharedFishmarksNumber: action.sharedFishmarksNumber
			};
		case SHARE_WAYPOINT_CHECKED_SUCCESS:
			return {
				...state, sharedFishmarksNumber: action.number,
				sharedFishmarks: removeDuplicates([...state.sharedFishmarks, action.target], 'key'),
				displaySave: action.displaySave, selectedSharedFishmarks:action.selectedSharedFishmarks
			};

		case SHARE_WAYPOINT_CHECKED_FALSE:
			return {
				...state, sharedFishmarksNumber: action.number, selectedSharedFishmarks:
					[...state.selectedSharedFishmarks.filter(item => item.key !== action.selectedSharedFishmark.key)],
				sharedFishmarks: [...state.sharedFishmarks.map(fishmark => {
					return {...fishmark,
						checked:fishmark.key === action.selectedSharedFishmark.key ? action.selectedSharedFishmark.checked :
							fishmark.checked
					}})]
			};

		case SHARE_WAYPOINT_CHECKED_CLEAR:
			return { ...state, selectedSharedFishmarks: [], cleared: action.cleared };

		case SHARE_WAYPOINT_CHECKED_FAILED:
			return { ...state, message: action.message };
		default:
			return state;
	}


};

export default reducer;