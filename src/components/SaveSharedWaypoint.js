import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements'
import { saveSharedWaypoints } from '../actions/fishmarks';

class SaveSharedWaypoint extends Component {

	constructor() {
		super();
		this.saveToWaypoints = this.saveToWaypoints.bind(this);
		this.displaySaveIcon = this.displaySaveIcon.bind(this);

	}

	displaySaveIcon = () => {
		let checkedFishmarks = 0;
		let displaySave = false;
		this.props.selectedSharedFishmarks.forEach(fishmark => {
			if (fishmark.checked === true) {
				++checkedFishmarks;
			}
		});
		if (checkedFishmarks > 0) {
			displaySave = true;
		}

		return displaySave;
	};


	saveToWaypoints = () => {
		this.props.dispatch(saveSharedWaypoints(this.props.selectedSharedFishmarks));
	};

	render() {
		return (
			this.props.sharedFishmarks.length > 0 && this.displaySaveIcon() ?

				<Icon name="save"
				      size={26}
				      color={'white'}
				      underlayColor={'#2F95D6'}
				      onPress={this.saveToWaypoints}
				      containerStyle={{paddingRight: 10 }}/> : null
		);
	}
}

const mapStateToProps = state => {
	return {
		displaySave: state.fishmarks.displaySave,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
		sharedFishmarks: state.fishmarks.sharedFishmarks,
		intervalAlive: state.user.intervalAlive
	};
};

export default connect(mapStateToProps)(SaveSharedWaypoint);