import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	StyleSheet,
	View,
	Alert,
	Platform,
	Linking,
	AsyncStorage,
	Button,
	Text,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {saveSharedWaypoints} from '../actions/fishmarks';

import IconBadge from 'react-native-icon-badge';


class SaveSharedWaypoint extends Component {


	constructor () {
		super()
		this.saveToWaypoints = this.saveToWaypoints.bind(this)
	}

	saveToWaypoints = () => {
		this.props.dispatch(saveSharedWaypoints(this.props.selectedSharedFishmarks))
	}

	render() {
		return (
			this.props.sharedFishmarks.length > 0 ?
				<IconAwesome
					name="save"
					size={24}
					color={'white'}
					onPress={this.saveToWaypoints}
					style={{ paddingRight: 20 }}/> : null
		);
	}
}

const mapStateToProps = state => {
	console.log("SAVE STATUS", state.fishmarks.displaySave)
	return {
		displaySave: state.fishmarks.displaySave,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
		sharedFishmarks: state.fishmarks.sharedFishmarks
	};
};

export default connect(mapStateToProps)(SaveSharedWaypoint);