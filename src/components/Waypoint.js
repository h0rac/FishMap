import React, { Component } from 'react';
import {
	StyleSheet,
	Text, Alert,
	View,
	Image, TouchableHighlight, TouchableOpacity
} from 'react-native';

import IconBtn from 'react-native-vector-icons/FontAwesome';
import FlipCard from 'react-native-flip-card-view';
import { deleteFishmarkPosition, shareWaypointChecked, uncheckWaypointShared } from '../actions/fishmarks';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

import {
	Menu,
	MenuProvider,
	MenuOptions,
	MenuOption,
	MenuTrigger

} from 'react-native-popup-menu';


const IconOption = (props) => (
	<MenuOption {...props}>
		<Icon name={props.iconName} size={14}/>
		{props.children}
	</MenuOption>
);


class Waypoint extends Component {

	constructor() {
		super();
		this.moveToFishWaypoint = this.moveToFishWaypoint.bind(this);
		this.handleShareWaypoint = this.handleShareWaypoint.bind(this);
		this._renderFront = this._renderFront.bind(this);
		this._renderBack = this._renderBack.bind(this);
		this.renderMenuItem = this.renderMenuItem.bind(this);
		this.handleEdit = this.handleEdit.bind(this)

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

		this.setState({ opened: false });
		this.props.shareWaypointCallback(this.props.item);
	};

	renderMenuItem = (icon, name, color) => {
		let disabled = false;
		if(name === 'Share') {
			if(this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.includes(this.props.item))
				disabled = true
		}
		return (
			<View style={styles.menuItem}>
				<Icon name={icon} size={14} type='font-awesome' color={disabled ? 'gray' : color}/>
				<Text style={ disabled ? { paddingLeft: 10, color: "gray" }: { paddingLeft: 10 }}>{name}</Text>
			</View>
		);
	};

	handleEdit = () => {
		this.setState({ opened: false });
		this.props.navigation.navigate('WayPointEditScreen')
	}


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
							name='arrow-circle-right'
							type='font-awesome'
							color={'green'}
							size={20}
							underlayColor={'mintcream'}
							containerStyle={{ backgroundColor: 'mintcream' }}
							onPress={() => !this.props.shared ? this.moveToFishWaypoint('MainScreen') : null}
						/> : <Icon
							name='times-rectangle'
							type='font-awesome'
							color={'red'}
							size={20}
							onPress={() => console.log('clicked delete')}
						/>}


				</View>
			</View>
		);
	}


	_renderBack() {
		return (
			<View style={styles.rowBack}>
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

						<Menu opened={this.state.opened}>
							<MenuTrigger onPress={() => this.setState({ opened: true })}>
								<Icon
									name='more-vert'
									color={'green'}
									size={20}
									underlayColor={'mintcream'}
									containerStyle={{ backgroundColor: 'mintcream' }}

								/>
							</MenuTrigger>
							<MenuOptions>
								<MenuOption disabled={this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.includes(this.props.item)} onSelect={() => this.handleShareWaypoint()}>
									{this.renderMenuItem('share-alt', 'Share', 'green')}
								</MenuOption>
								<View style={styles.contextDivider}/>
								<MenuOption onSelect={() => this.props.dispatch(deleteFishmarkPosition(this.props.item))}>
									{this.renderMenuItem('close', 'Delete', 'red')}
									<View style={styles.contextDivider}/>
								</MenuOption>
								<MenuOption onSelect={() => this.handleEdit()}>
									{this.renderMenuItem('edit', 'Edit', '#2F95D6')}
									<View style={styles.contextDivider}/>
								</MenuOption>
								<MenuOption onSelect={() => this.setState({ opened: false })}>
									{this.renderMenuItem('sign-out', 'Close', '#2F95D6')}
								</MenuOption>
							</MenuOptions>
						</Menu>
						:
						<Icon
							name='times-rectangle'
							type='font-awesome'
							color={'red'}
							size={20}
							onPress={() => console.log('clicked delete')}
						/>}
				</View>
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


const styles = {

	iconLeft: {
		justifyContent: 'center',
		paddingLeft: 20,
		alignItems: 'flex-start'
	},

	nameTitleShared: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},

	menuItem: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: 2,
		paddingTop: 2,
		paddingBottom: 2
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
		backgroundColor: 'mintcream',
		height: 70

	},

	contextDivider: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1
	},

	rowBack: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		backgroundColor: 'mintcream',
		height: 70

	},

	nameTitle: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems: 'flex-end'
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
		alignItems: 'flex-end'

	},
	rightIcon: {
		width: 80,
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 20
	},
	scoreDate: {
		fontSize: 10,
		marginBottom: 5
	},
	scoreText: {
		fontSize: 10,
		marginTop: 8
	}
};

const mapStateToProps = state => {


	return {
		allSelected: state.fishmarks.allSelected,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
		myFishmarkWaypoints: state.fishmarks.myFishmarkWaypoints

	};
};

export default connect(mapStateToProps)(Waypoint);

