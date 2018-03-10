import React from 'react';
import { connect } from 'react-redux';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { changeDuration } from '../actions/user';
import PropTypes from 'prop-types'

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
			style={{ paddingRight: 10 }}
		/>);
}

}

const mapStateToProps = state => {
return {
	tempDuration: state.user.tempDuration,
	socketIO: state.user.socketIO
};

};

SaveSettings.propTypes = {
  tempDuration: PropTypes.number,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(SaveSettings);
