import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
	moveToFishmarkPosition, loadFishWaypointsOnPush, shareWaypoint, clearSharedCheckedWaypoints,
	shareWaypointChecked, uncheckWaypointShared
} from '../actions/fishmarks';
import Notificator from '../components/Notificator';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import SaveSharedWaypoint from '../components/SaveSharedWaypoint';
import { changeReceiveStatus } from '../actions/user';
import Waypoint from '../components/Waypoint';


const labelStyle = (props, alignSelf, marginTop) => ({
	fontSize: 14,
	fontWeight: '500',
	marginTop,
	color: props.focused ? props.tintColor : 'white'
});

class WayPointScreen extends Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state;

		return {
			headerStyle: {
				backgroundColor: '#2F95D6',
			},
			title:'Waypoints',
			tabBarLabel: (props) => (<Text style={labelStyle(props, 'flex-end', 15)}> Waypoints </Text>),
			headerTintColor: 'white',
			tabBarIcon:
				<Notificator/>,
			headerRight:
				<SaveSharedWaypoint/>
		};
	};

	constructor() {
		super();
		this._handleMoveToFishmarkPostion = this._handleMoveToFishmarkPostion.bind(this);
		this._handlePushToRefresh = this._handlePushToRefresh.bind(this);
		this._shareWaypoint = this._shareWaypoint.bind(this);
		this._renderCurrentFishmarks = this._renderCurrentFishmarks.bind(this);
		this._renderSharedFishmarks = this._renderSharedFishmarks.bind(this);
		this._handleScreenSwitcher = this._handleScreenSwitcher.bind(this);
		this._handleCheck = this._handleCheck.bind(this);

		this.state = {
			showWaypoints: false,
			selectedWaypoints: []
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({ bagdeNum: this.props.sharedFishmarks.length });
	}

	onLayout() {
		const { width, height } = Dimensions.get('window');
	}

	_handleMoveToFishmarkPostion = (region, selected) => {
		this.props.dispatch(moveToFishmarkPosition(region, selected));
		this.props.mapView.animateToCoordinate({
			latitude: region.latitude,
			longitude: region.longitude
		}, 1500);

	};

	_handlePushToRefresh = () => {
		this.props.dispatch(loadFishWaypointsOnPush());
	};

	_shareWaypoint = (data) => {
		this.props.dispatch(shareWaypoint(data));
	};


	_renderCurrentFishmarks = () => {
		const result = <FlatList
			data={this.props.loadedWaypoints.length > 0 ? this.props.loadedWaypoints : this.props.positions.fishmarks.slice(0, 7).reverse()}
			renderItem={({ item }) => <Waypoint navigation={this.props.navigation}
																					item={item}
																					callback={this._handleMoveToFishmarkPostion}
																					shareWaypointCallback={this._shareWaypoint} shared={false}/>}
			keyExtractor={item => item.key}
			onRefresh={this._handlePushToRefresh}
			refreshing={this.props.refreshing}
		/>;
		return result;
	};

	_handleCheck = (status, item) => {
		this.props.dispatch(shareWaypointChecked(item.checked, item, this.props.intervalAlive));

	};

	_renderSharedFishmarks = () => {
		const result = <FlatList
			data={this.props.sharedFishmarks}
			renderItem={({ item }) => <Waypoint item={item} callbackHandleCheck={this._handleCheck}
																					shared={true}/>}
			keyExtractor={item => item.key}
		/>;
		return result;
	};

	_handleScreenSwitcher = () => {
		this.setState({ showWaypoints: !this.state.showWaypoints });
	};


	render() {

		return (<View style={styles.container} onLayout={this.onLayout.bind(this)}>
			<View style={styles.waypoints}>
				{(this.props.sharedFishmarks && this.props.sharedFishmarks.length > 0 && !this.state.showWaypoints) ?
					this._renderSharedFishmarks() : this._renderCurrentFishmarks()}
			</View>
			{this.props.sharedFishmarks.length > 0 ?
			<TouchableOpacity style={styles.switcher} onPress={this._handleScreenSwitcher}>
				 <View>
						<Text style={styles.switcherText}>{!this.state.showWaypoints ? '< Your waypoints' : 'Shared waypoints >'}</Text>
					</View>
			</TouchableOpacity>:null}
		</View>);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'whitesmoke'
	},

	waypoints: {
		flex: 0.9
	},
	switcherText: {
		color: 'gray',
		fontWeight: '300'
	},

	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		width: 50
	},
	title: {
		backgroundColor: 'black',
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		padding: 10,
		textAlign: 'center'
	},
	switcher: {
		justifyContent: 'center',
		flexDirection: 'row',
		flex: 0.1,
		alignItems: 'center'
	}
});

const mapStateToProps = state => {

	return {
		positions: state.fishmarks,
		loadedWaypoints: state.fishmarks.loadedWaypoints,
		refreshing: state.fishmarks.refreshing,
		sharedFishmarks: state.fishmarks.sharedFishmarks,
		copiedSharedFishmarks: state.fishmarks.copiedSharedFishmarks,
		sharedFishmarksNumber: state.fishmarks.sharedFishmarksNumber,
		allSelected: state.fishmarks.allSelected,
		selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
		received: state.user.receive,
		intervalAlive: state.user.intervalAlive,
		mapView: state.fishmarks.mapView
	};
};


export default connect(mapStateToProps)(WayPointScreen);
