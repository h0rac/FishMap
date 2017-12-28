import React, { Component } from 'react';
import {
	StyleSheet,
	Text, Alert,
	View,
	Image, TouchableHighlight, TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import FlipCard from 'react-native-flip-card-view';
import { shareWaypointChecked, uncheckWaypointShared } from '../actions/fishmarks';
import { connect } from 'react-redux';
import ioSocket from '../common/socket';


class Waypoint extends Component {

	constructor() {
		super();
		this.moveToFishWaypoint = this.moveToFishWaypoint.bind(this);
		this.handleShareWaypoint = this.handleShareWaypoint.bind(this);
		this._renderFront = this._renderFront.bind(this);
		this._renderBack = this._renderBack.bind(this);

		this.state = {
			checked: null
		};

	}


	moveToFishWaypoint = (screen) => {
		const region = {
			latitude: this.props.item.latitude,
			latitudeDelta: this.props.item.latitudeDelta,
			longitude: this.props.item.longitude,
			longitudeDelta: this.props.item.longitudeDelta
		};

		this.props.callback(region, true);
		this.props.navigation.navigate(screen);

	};

	handleShareWaypoint = () => {
		this.props.shareWaypointCallback(this.props.item._id);
	};

	_renderFront() {
		return (
			<View style={styles.row}>
				<View style={styles.iconContainer}>
					{this.props.shared ?
						<CheckBox
							title=''
							checked={this.props.item.checked}
							onPress={() => this.props.callbackHandleCheck(this.props.item.checked, this.props.item)}
							containerStyle={{ borderWidth: 0, borderColor: 'red' }}
						/>
						:
						<Icon name="anchor" style={styles.icon} color={'#2F95D6'}/>}
				</View>
				<View style={styles.nameTitle}>
					<Text style={styles.name}>{this.props.item.title} </Text>
				</View>
				<View style={styles.levelTitle}>
					<Text style={styles.level}>{this.props.item.latitude}</Text>
					<Text style={styles.scoreDate}>{this.props.item.longitude}</Text>

				</View>
				<View style={styles.scoreTitle}>
					<Text style={styles.scoreText}>{this.props.item.date}</Text>
					{!this.props.shared ?
						<Icon name="arrow-circle-right" style={styles.icon}
									onPress={() => !this.props.shared ? this.moveToFishWaypoint('MainScreen') : null}
									onLongPress={!this.props.shared ? this.handleShareWaypoint : null}/>
						: 	<Icon name="times-rectangle" style={styles.icon}
										 onPress={() => console.log('Cancel clicked')}
										 />}
				</View>
			</View>
		);
	}

	_renderBack() {
		return (
			<View style={{ backgroundColor: 'mintcream', flex: 1, height: 100 }}>
				<Text>Hello back page</Text>
			</View>);
	}


	render() {
		return (
			<FlipCard style={{ flex: 1 }}
								velocity={3} // Velocity makes it move
								tension={5} // Slow
								friction={5}
								renderFront={this._renderFront()} renderBack={this._renderBack()}>

			</FlipCard>
		);
	}
}


const styles = StyleSheet.create({

	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 50,
		width: 50
	},

	animatedContainer: {
		flex: 1
	},

	icon: {
		height: 22,
		width: 22,
		paddingTop: 5
	},
	row: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 20,
		paddingBottom: 30
	},
	nameTitle: {
		flex: 1,
		justifyContent: 'center'
	},
	name: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	level: {
		fontSize: 10
	},
	levelTitle: {
		flex: 1,
		justifyContent: 'center'

	},
	scoreTitle: {
		width: 80,
		paddingLeft: 20
	},
	scoreDate: {
		fontSize: 10,
		marginBottom: 5
	},
	scoreText: {
		fontSize: 10,
		marginTop: 8
	}
});

const mapStateToProps = state => {


	return {
		allSelected: state.fishmarks.allSelected,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks

	};
};

export default connect(mapStateToProps)(Waypoint);

