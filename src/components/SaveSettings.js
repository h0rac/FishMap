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
import { changeReceiveStatus, changeDuration, setIntervalID } from '../actions/user';
import { API_ENDPOINT } from '../constants/constants';




class SaveSettings extends React.Component {

	constructor() {
		super()
		this.saveSettings = this.saveSettings.bind(this)
	}


	saveSettings () {
		this.props.dispatch(changeDuration(this.props.tempDuration))
	}


	render() {
		return(
			<IconAwesome
			name="save"
			size={28}
			color="white"
			onPress={() => this.saveSettings() }
			style={{ paddingRight: 20 }}
		/>)
	}

}

const mapStateToProps = state => {
	return {
		tempDuration: state.user.tempDuration,
		socketIO: state.user.socketIO
	}

}

export default connect(mapStateToProps)(SaveSettings)