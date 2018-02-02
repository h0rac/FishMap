import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
	moveToFishmarkPosition, loadFishWaypointsOnPush, shareWaypointChecked, shareMyWaypoint
} from '../actions/fishmarks';
import Notificator from '../components/Notificator';
import SaveSharedWaypoint from '../components/SaveSharedWaypoint';
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
				backgroundColor: '#2F95D6'
			},
			title: 'Waypoints',
			tabBarLabel: (props) => (<Text style={labelStyle(props, 'flex-end', 15)}> Waypoints </Text>),
			headerTintColor: 'white',
			tabBarIcon:
				<Notificator type={'waypoint'}/>,
			headerRight:
				<SaveSharedWaypoint/>
		};
	};

	constructor() {
		super();
		this._handleMoveToFishmarkPostion = this._handleMoveToFishmarkPostion.bind(this);
		this.handlePushToRefresh = this.handlePushToRefresh.bind(this);
		this.shareWaypoint = this.shareWaypoint.bind(this);
		this.renderCurrentFishmarks = this.renderCurrentFishmarks.bind(this);
		this.renderSharedFishmarks = this.renderSharedFishmarks.bind(this);
		this.handleScreenSwitcher = this.handleScreenSwitcher.bind(this);
		this.handleCheck = this.handleCheck.bind(this);

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

	handlePushToRefresh = () => {
		this.props.dispatch(loadFishWaypointsOnPush());
	};

	shareWaypoint = (data) => {
		this.props.dispatch(shareMyWaypoint(data));
	};


	renderCurrentFishmarks = () => {
		const result = <FlatList
			data={this.props.loadedWaypoints.length > 0 ? this.props.loadedWaypoints : this.props.positions.fishmarks.slice(0, 7).reverse()}
			renderItem={({ item }) => <Waypoint navigation={this.props.navigation}
			                                    item={item}
			                                    callback={this._handleMoveToFishmarkPostion}
			                                    shareWaypointCallback={this.shareWaypoint} shared={false}/>}
			keyExtractor={item => item.key}
			onRefresh={this.handlePushToRefresh}
			refreshing={this.props.refreshing}
		/>;
		return result;
	};

	handleCheck = (status, item) => {
		this.props.dispatch(shareWaypointChecked(item.checked, item, this.props.intervalAlive));

	};

	renderSharedFishmarks = () => {
		const result = <FlatList
			data={this.props.sharedFishmarks}
			renderItem={({ item }) => <Waypoint item={item} callbackHandleCheck={this.handleCheck}
			                                    shared={true}/>}
			keyExtractor={item => item.key}
		/>;
		return result;
	};

	handleScreenSwitcher = () => {
		this.setState({ showWaypoints: !this.state.showWaypoints });
	};


	render() {

		return (<View style={styles.container} onLayout={this.onLayout.bind(this)}>

			<View style={styles.waypoints}>
				{(this.props.sharedFishmarks && this.props.sharedFishmarks.length > 0 && !this.state.showWaypoints) ?
					this.renderSharedFishmarks() : this.renderCurrentFishmarks()}
			</View>
			{this.props.sharedFishmarks.length > 0 ?
				<TouchableOpacity style={styles.switcher} onPress={this.handleScreenSwitcher}>
					<View>
						<Text
							style={styles.switcherText}>{!this.state.showWaypoints ? '< Your waypoints' : 'Received waypoints >'}</Text>
					</View>
				</TouchableOpacity> : null}
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
