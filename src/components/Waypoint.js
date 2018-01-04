import React, { Component } from 'react';
import {
	StyleSheet,
	Text, Alert,
	View,
	Image, TouchableHighlight, TouchableOpacity
} from 'react-native';

import IconBtn from 'react-native-vector-icons/FontAwesome';
import FlipCard from 'react-native-flip-card-view';
import { shareWaypointChecked, uncheckWaypointShared } from '../actions/fishmarks';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements'
import CheckBox from 'react-native-check-box'

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
				<View style={styles.iconLeft}>
					{this.props.shared ?
						<CheckBox
							isChecked={this.props.item.checked}
							onClick={() => this.props.callbackHandleCheck(this.props.item.checked, this.props.item)}
							checkBoxColor={'green'}
							/>
						:
						<Icon
							name='anchor'
							type='font-awesome'
							size={20}
							color={'#2F95D6'}/>
					}
				</View>
					<View style={styles.nameTitle}>
						<Text style={styles.name}>{this.props.item.title} </Text>
					</View>
				<View style={styles.levelTitle}>
					<Text style={styles.level}>{this.props.item.latitude}</Text>
					<Text style={styles.scoreDate}>{this.props.item.longitude}</Text>

				</View>
				<View style={styles.rightIcon}>
					{!this.props.shared ?
						<Icon
							name ='arrow-circle-right'
							type ='font-awesome'
							color={'green'}
							size={20}
							underlayColor={'mintcream'}
							containerStyle={{backgroundColor:'mintcream'}}
							onPress={() => !this.props.shared ? this.moveToFishWaypoint('MainScreen') : null}
							onLongPress={()=> !this.props.shared ? this.handleShareWaypoint():null}
						/>: 		<Icon
							name ='times-rectangle'
							type ='font-awesome'
							color={'red'}
							size={20}
							onPress={()=>console.log('clicked delete')}
						/>}


				</View>
			</View>
		);
	}

	_renderBack() {
		return (
			<View style={styles.rowBack}>
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

	iconLeft: {
		justifyContent: 'center',
		paddingLeft:20,
		alignItems:'flex-start'
	},

	nameTitleShared: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end',
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
		backgroundColor:'mintcream',
		height:70

	},

	rowBack: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		backgroundColor:'mintcream',
		height:70

	},

	nameTitle: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems:'flex-end'
	},
	name: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	level: {
		fontSize: 10
	},
	levelTitle: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems:'flex-end'

	},
	rightIcon: {
		width: 80,
		justifyContent:'center',
		alignItems:'flex-end',
		paddingRight:20
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
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,

	};
};

export default connect(mapStateToProps)(Waypoint);

