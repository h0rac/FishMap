import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Text,
} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import IconBadge from 'react-native-icon-badge';


class Notificator extends Component {


	render() {
		return (
			<IconBadge
				MainElement={<IconAwesome
					name={this.props.type === 'waypoint' ? 'map-marker' : 'share-alt'}
					size={26}
					color={'white'}
					//style={{paddingLeft:20}}
				/>}
				BadgeElement={
					<Text
						style={{ color: this.props.type === 'waypoint' ? 'yellow' : 'black' }}>{this.props.type === 'waypoint' ? this.props.sharedFishmarks && this.props.sharedFishmarks.length : this.props.myFishmarkWaypoints.length}</Text>
				}
				IconBadgeStyle={
					this.props.type === 'waypoint' ?
						{
							top: -3,
							left: 11,
							minWidth: 20,
							height: 20,
							justifyContent: 'space-around',
							backgroundColor: 'red'
						}
						: {
							top: -3,
							left: 20,
							minWidth: 20,
							height: 20,
							justifyContent: 'space-around',
							backgroundColor: 'yellow'
						}
				}
				Hidden={this.props.type === 'waypoint' ? this.props.sharedFishmarks && this.props.sharedFishmarks.length === 0 : this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.length === 0}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		sharedFishmarks: state.fishmarks.sharedFishmarks,
		sharedFishmarksNumber: state.fishmarks.sharedFishmarksNumber,
		myFishmarkWaypoints: state.fishmarks.myFishmarkWaypoints,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks
	};
};

export default connect(mapStateToProps)(Notificator);