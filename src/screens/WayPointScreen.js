import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableHighlight, Platform, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
	moveToFishmarkPosition, loadFishWaypointsOnPush, shareWaypoint, clearSharedCheckedWaypoints,
	shareWaypointChecked, uncheckWaypointShared
} from '../actions/fishmarks';
import Notificator from '../components/Notificator';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import SaveSharedWaypoint from '../components/SaveSharedWaypoint';

import Waypoint from '../components/Waypoint';

class WayPointScreen extends Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state;

		return {
			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			title: 'Waypoints',
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
		this._renderScreenSwitcher = this._renderScreenSwitcher.bind(this);
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

	};

	_handlePushToRefresh = () => {
		this.props.dispatch(loadFishWaypointsOnPush());
	};

	_shareWaypoint = (data) => {
		this.props.dispatch(shareWaypoint(data));
	};


	_renderCurrentFishmarks = () => {
		const result = <FlatList
			data={this.props.loadedWaypoints.length > 0 ? this.props.loadedWaypoints : this.props.positions.fishmarks.slice(0, 5).reverse()}
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
		this.props.dispatch(shareWaypointChecked(item.checked, item));

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

	_renderScreenSwitcher = () => {
		const result =
				<View style={styles.switcher}>
			<TouchableHighlight onPress={this._handleScreenSwitcher} underlayColor={null}>
					<View>
					<Text>{!this.state.showWaypoints ? '< Your waypoints' : 'Shared waypoints >'}</Text>
					</View>
			</TouchableHighlight>
	</View>
		return result;
	};


	render() {

		return (<View style={styles.container} onLayout={this.onLayout.bind(this)}>
			{(this.props.sharedFishmarks && this.props.sharedFishmarks.length > 0  && !this.state.showWaypoints) ?
				this._renderSharedFishmarks() : this._renderCurrentFishmarks()}
			{this.props.sharedFishmarks.length > 0 ? this._renderScreenSwitcher() : null}
		</View>);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'mintcream'
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
		justifyContent: 'flex-end',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom:10
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
		received: state.user.receive
	};
};


export default connect(mapStateToProps)(WayPointScreen);
