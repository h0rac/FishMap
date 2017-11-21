import {SET_FISHMARK_POSITION, UPDATE_FISHMARK_DATA, MOVE_TO_FISHMARK_POSITION,
    DELETE_FISHMARK_POSITION, LOAD_FISHMARK_POSITIONS, UPLOAD_FISHMARK_POSITIONS
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

export const loadFishmarkPositions = () => ({
    type: LOAD_FISHMARK_POSITIONS
});

export const uploadFishmarkPositions = data => ({
    type: UPLOAD_FISHMARK_POSITIONS,
    data,
})