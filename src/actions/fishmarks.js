import {SET_FISHMARK_POSITION, MOVE_TO_FISHMARK_POSITION,LOAD_FISHMARKS_POSITIONS,
    DELETE_FISHMARK_POSITION, LOAD_WAYPOINTS_ON_PUSH,
} from '../constants/constants'

export const setFishmark = (data) => ({
    type: SET_FISHMARK_POSITION,
    data,
});

export const moveToFishmarkPosition = (position,selected) => ({
    type: MOVE_TO_FISHMARK_POSITION,
    position,
    selected
});

export const deleteFishmarkPosition = (position) => ({
    type: DELETE_FISHMARK_POSITION,
    position,
});

export const loadFishPositions = () => ({
    type: LOAD_FISHMARKS_POSITIONS
});

export const loadFishWaypointsOnPush = () =>({
    type: LOAD_WAYPOINTS_ON_PUSH
})