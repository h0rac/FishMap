import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { changeDuration } from '../actions/user';

class SaveSettings extends React.Component {

	constructor() {
		super();
		this.saveSettings = this.saveSettings.bind(this);
	}


	saveSettings() {
		this.props.dispatch(changeDuration(this.props.tempDuration));
	}


	render() {
		return (
			<IconAwesome
				name="save"
				size={28}
				color="white"
				onPress={() => this.saveSettings()}
				style={{ paddingRight: 20 }}
			/>);
	}

}

const mapStateToProps = state => {
	return {
		tempDuration: state.user.tempDuration,
		socketIO: state.user.socketIO
	};

};

export default connect(mapStateToProps)(SaveSettings);