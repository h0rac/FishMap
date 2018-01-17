import {
	SET_FISHMARK_POSITION, MOVE_TO_FISHMARK_POSITION, LOAD_FISHMARKS_POSITIONS,
	DELETE_FISHMARK_POSITION, LOAD_WAYPOINTS_ON_PUSH, IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST, SHARE_WAYPOINT,
	SHARE_WAYPOINT_CHECKED, SHARE_WAYPOINT_CHECKED_CLEAR, SHARE_WAYPOINT_UNCHECKED, SAVE_SHARED_WAYPOINTS,SET_MAP_FOR_ANIMATION,
	SHARE_MY_WAYPOINT
} from '../constants/constants';

export const setFishmark = (data) => ({
	type: SET_FISHMARK_POSITION,
	data
});

export const moveToFishmarkPosition = (position, selected) => ({
	type: MOVE_TO_FISHMARK_POSITION,
	position,
	selected
});

export const deleteFishmarkPosition = (position) => ({
	type: DELETE_FISHMARK_POSITION,
	position
});

export const loadFishPositions = () => ({
	type: LOAD_FISHMARKS_POSITIONS
});

export const loadFishWaypointsOnPush = () => ({
	type: LOAD_WAYPOINTS_ON_PUSH
});

export const IOsetFishmarksCandidateList = (waypoints) => ({
	type: IOSOCKET_CREATE_CANDIDATE_FISHMARKS_LIST,
	waypoints

});

export const shareWaypoint = id => ({
	type: SHARE_WAYPOINT,
	id
});

export const shareWaypointChecked = (checked, target, intervalAlive) => ({
	type: SHARE_WAYPOINT_CHECKED,
	checked,
	target,
	intervalAlive
});

export const shareMyWaypoint = (data) => ({
	type:SHARE_MY_WAYPOINT,
	data,
})

export const clearSharedCheckedWaypoints = (cleared) => ({
	type: SHARE_WAYPOINT_CHECKED_CLEAR,
	cleared
});

export const uncheckWaypointShared = (checked, target) => ({
	type: SHARE_WAYPOINT_UNCHECKED,
	checked,
	target
});

export const saveSharedWaypoints = (waypoints) => ({
	type: SAVE_SHARED_WAYPOINTS,
	waypoints: waypoints
});

export const setMapViewForAnimation = (mapView) => ({
	type: SET_MAP_FOR_ANIMATION,
	mapView: mapView
})