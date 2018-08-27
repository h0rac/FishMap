/* global require */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image
} from 'react-native';
import { deleteFishmarkPosition, selectWaypoint } from '../actions/fishmarks';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger

} from 'react-native-popup-menu';

class Waypoint extends Component {

constructor() {
	super();
	this.moveToFishWaypoint = this.moveToFishWaypoint.bind(this);
	this.handleShareWaypoint = this.handleShareWaypoint.bind(this);
	this.renderMenuItem = this.renderMenuItem.bind(this);
	this.handleEdit = this.handleEdit.bind(this);

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
	if (name === 'Share') {
		if (this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.includes(this.props.item))
			disabled = true;
	}
	return (
		<View style={styles.menuItem}>
			<Icon name={icon} size={14} type='font-awesome' color={disabled ? 'gray' : color}/>
			<Text style={disabled ? { paddingLeft: 10, color: 'gray' } : { paddingLeft: 10 }}>{name}</Text>
		</View>
	);
};

handleEdit = () => {
	this.setState({ opened: false });
	const position = {latitude: this.props.item.latitude, longitude: this.props.item.longitude}
	this.props.dispatch(selectWaypoint(position));
	this.props.navigation.navigate('WayPointEditScreen');
};

render() {

	const leftButtons = [
		{
			backgroundColor: !this.props.shared ? '#2F95D6' : !this.props.item.checked ? '#2F95D6' : '#23B523',
			onPress: !this.props.shared ? () => this.setState({ opened: true }) : () => this.props.callbackHandleCheck(this.props.item.checked, this.props.item),
			underlayColor: !this.props.shared ? '#2684C1' : '#23B523',
			component:
				<View style={styles.iconLeft}>
					{!this.props.shared ?

						<Menu opened={this.state.opened}>
							<MenuTrigger>
								<Image
									style={{ width: 26, height: 26 }}
									disabled={true}
									source={require('../assets/dots-horizontal.png')}
								/>
								<Text style={{ color: 'white' }}>More</Text>
							</MenuTrigger>
							<MenuOptions>
								<MenuOption
									disabled={this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.includes(this.props.item)}
									onSelect={() => this.handleShareWaypoint()}>
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
						<View>
							<Image
								style={{ width: 26, height: 26 }}
								disabled={this.props.item.checked}
								source={!this.props.item.checked ? require('../assets/radiobox-blank.png') : require('../assets/radiobox-marked.png')}
								onPress={() => this.props.callbackHandleCheck(this.props.item.checked, this.props.item)}/>
							<Text style={{ color: 'white' }}>Save</Text>
						</View>

					}
				</View>
		}
	];
	const rightButtons = [
		{
			backgroundColor: !this.props.shared ? '#23B523' : '#E83535',
			underlayColor: !this.props.shared ? '#1F9F1F' : '#E83535',
			onPress: () => !this.props.shared ? this.moveToFishWaypoint('MainScreen') : null,
			component:
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{!this.props.shared ?
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={{ width: 26, height: 26 }}
								disabled={true}
								source={require('../assets/arrow-right-bold-circle.png')}
								onPress={() => !this.props.shared ? this.moveToFishWaypoint('MainScreen') : null}/>
							<Text style={{ color: 'white' }}>Move to</Text>
						</View>
						:
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={{ width: 26, height: 26 }}
								disabled={true}
								source={require('../assets/delete.png')}/>
							<Text style={{ color: 'white' }}>Delete</Text>
						</View>
					}
				</View>
		}
	];

	const splitDate = this.props.item.date.split(' ');

	return (
		<Swipeout left={leftButtons} right={rightButtons} backgroundColor={'whitesmoke'} buttonWidth={60}>
			<View style={styles.row}>
				<View style={styles.nameTitle}>
					<Text style={styles.name}>{this.props.item.title} </Text>
				</View>
				<View style={styles.coords}>
					<Text style={styles.latitude}>{this.props.item.latitude}</Text>
					<Text style={styles.longitude}>{this.props.item.longitude}</Text>
				</View>
				<View style={styles.date}>
					<Text style={styles.year}>{splitDate[3]}</Text>
					<Text style={styles.month}>{`${splitDate[0]} ${splitDate[1]} ${splitDate[2]}`}</Text>
				</View>
			</View>
		</Swipeout>
	)}
}

const styles = {

iconLeft: {
	justifyContent: 'center',
	flex: 1,
	alignItems: 'center'
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
	justifyContent: 'space-between',
	backgroundColor: 'mintcream',
	height: 80

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
	flex: 1,
	alignItems: 'flex-start',
	paddingLeft: 10,
	justifyContent: 'center'
},
name: {
	fontSize: 11,
	fontWeight: 'bold'
},
level: {
	fontSize: 11
},
coords: {
	flex: 1,
	alignItems: 'center',
	paddingRight: 10,
	justifyContent: 'center'
},

date: {
	flex: 0.5,
	alignItems: 'flex-end',
	paddingRight: 10,
	justifyContent: 'center'

},

rightIcon: {
	justifyContent: 'center',
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center'
},
latitude: {
	fontSize: 11
},
longitude: {
	fontSize: 11,
	marginTop: 2
},

year: {
	fontSize: 11,
	marginRight: 12
},
month: {
	fontSize: 11,
	marginTop: 2
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

Waypoint.propTypes = {
  item: PropTypes.object,
  callback: PropTypes.func,
  navigation: PropTypes.object,
  shareWaypointCallback: PropTypes.func,
  callbackHandleCheck: PropTypes.func,
  myFishmarkWaypoints: PropTypes.array,
  dispatch: PropTypes.func
}
