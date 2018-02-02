import React, { Component, PropTypes } from 'react';
import FishMarker from '../components/FishMarker';
import UserMarker from '../components/UserMarker';

import {
	StyleSheet,
	View,
	Alert,
	AsyncStorage,
	Text,
} from 'react-native';
import MapView from 'react-native-maps';

import { setFishmark, setMapViewForAnimation, shareMyWaypoint } from '../actions/fishmarks';
import { deleteFishmarkPosition } from '../actions/fishmarks';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { loadFishPositions, IOsetFishmarksCandidateList } from '../actions/fishmarks';
import {
	logout, getUserLocation, setIntervalID, checkAuthToken, setIntervalAlive
} from '../actions/user';

import { displayAlert } from '../common/utils';


const labelStyle =(props, alignSelf, marginTop)=> ({
	fontSize: 14,
	fontWeight: '500',
	marginTop,
	color: props.focused ? props.tintColor : "white",
});

let timeoutID;
let intervalId

let _mapView = MapView;
class MainScreen extends Component {

	constructor() {
		super();

		this._handleFishMarkerSet = this._handleFishMarkerSet.bind(this);
		this._handleFishMarkPress = this._handleFishMarkPress.bind(this);
		this._handleLogout = this._handleLogout.bind(this);
		this._logoutUser = this._logoutUser.bind(this);
		this.onReceiveFishmark = this.onReceiveFishmark.bind(this);
		this.setInitialUserPosition = this.setInitialUserPosition.bind(this)
		this.onReceiveError = this.onReceiveError.bind(this);
		this.handleSharing = this.handleSharing.bind(this)

		this.state = {
			interval: 0,
			intervalId:0,
			test:null,
			clear:null,
			intervalAlive:true,
		};
	}

	onReceiveError = (data) => {
		  displayAlert('Authentication', data)
			this.props.socketIO.emit('onErrorDisconnect')
		  this.props.navigation.navigate('LoginScreen')

	};

	_logoutUser() {
		AsyncStorage.getItem('token').then(token => {
			if (token) {
				this.props.socketIO.emit('onForceDisconnect', {token: JSON.parse(decodeURI(token))})
			}
		})
		clearInterval(this.props.timeoutID)
		this.props.dispatch(setIntervalAlive(true))
		this.props.dispatch(logout());
		this.props.navigation.navigate('LoginScreen');

	}

	_handleLogout() {
		Alert.alert(
			'Logout',
			'Do you want to logout from FishMap ?',
			[
				{ text: 'OK', onPress: () => this._logoutUser(), style: 'ok' },
				{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
			],
			{ cancelable: true }
		);
	};

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;


		return {

			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			headerTintColor: 'white',
			tabBarLabel: (props)=>(<Text style={labelStyle(props, 'flex-end', 15)}> Fish Map </Text>),
			headerLeft: <Icon
				name="md-menu"
				size={28}
				color={'white'}
				style={{ paddingLeft: 20 }}
				onPress={() => navigation.navigate('DrawerOpen')}
			/>,
			headerRight:
				<Icon
					name="md-exit"
					size={28}
					color={'white'}
					style={{ paddingRight: 20 }}
					onPress={() => params.handleLogout()}
				/>,
			tabBarIcon:
				<IconAwesome
					name="home"
					size={26}
					color={'white'}
				/>
		};
	};


	componentWillMount() {
		this.setState({ interval: this.props.duration , timeoutID:this.props.timeoutID,  intervalAlive:this.props.intervalAlive});
	}


	componentDidMount() {
		AsyncStorage.getItem('token').then(token => {
			if (!token) {
				this.props.navigation.navigate('LoginScreen');
			}
			else {
				this.props.dispatch(checkAuthToken(this.props.navigation, 'MainScreen'));
				if(this.props.intervalAlive) {
					clearInterval(this.props.timeoutID)
					 intervalId = setInterval(() => this.props.socketIO.emit('onFishmarkUpdate', {
						token: JSON.parse(decodeURI(token)),
						receive: this.props.receive
					}), this.state.interval);
					this.props.dispatch(setIntervalID(intervalId))
				}
				this.props.dispatch(getUserLocation());
				this.props.dispatch(loadFishPositions());
				this.props.navigation.setParams({ handleLogout: this._handleLogout });
				this.props.socketIO.on('onReceiveFishmark', data => this.onReceiveFishmark(data));
				this.props.socketIO.on('onReceiveError', data => this.onReceiveError(data.error));
			}
		});
	}


	onReceiveFishmark = (data) => {
		data.waypoints && !data.pause ? this.props.dispatch(IOsetFishmarksCandidateList(data.waypoints)) : null;
	};


	_handleFishMarkerSet(e) {

		this.props.dispatch(setFishmark({
			...e.nativeEvent.coordinate, latitudeDelta: 0.0922,
			longitudeDelta: 0.0421, title: 'Marker-' + e.nativeEvent.coordinate.latitude.toFixed(6),
			key: new Date().getTime(), date: new Date().toDateString()
		}));
	};

	handleSharing = (position) => {
		const toShare = this.props.positions.find(waypoint => waypoint.latitude === position.latitude && waypoint.longitude === waypoint.longitude)
		this.props.dispatch(shareMyWaypoint(toShare))
		this.props.navigation.navigate('SharingScreen')
	}


	_handleFishMarkPress = (e) => {
		const position = e.nativeEvent.coordinate;

		Alert.alert(
			'Waypoint',
			'What do you want to do with Waypoint ?',
			[
				{text: 'Share',  onPress: () => this.handleSharing(position) },
				{ text: 'Edit', onPress: () => this.props.navigation.navigate('WayPointEditScreen') },
				{ text: 'Delete', onPress: () => this.props.dispatch(deleteFishmarkPosition(position)) },
				{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
			],
			{ cancelable: true }
		);
	};

	setInitialUserPosition = () => {
		let initPosition;
		const userPos = this.props.userLocation.latitude ? this.props.userLocation : null;
		if (userPos || this.props.positions.length === 0) {
			initPosition = userPos;
		}
		return initPosition
	}


	render() {

		const initUserPosition = this.setInitialUserPosition();

		return (
			<View style={styles.container}>
				<MapView onLongPress={this._handleFishMarkerSet}
					//onRegionChangeComplete={()=> this.props.dispatch(loadFishmarkPositions())}
								 ref = {(mapView) => { _mapView = mapView; this.props.dispatch(setMapViewForAnimation(_mapView)) }}
								 style={styles.map}
								initialRegion={{latitude: 54.475408,
					longitude: 18.263086,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421}}>

					{this.props.positions.map((marker, index) =>
						<FishMarker key={index} marker={marker}
												callbackPress={this._handleFishMarkPress}
						/>
					)}
					{this.props.userLocation.latitude ?
						<UserMarker marker={initUserPosition}/> : null}
				</MapView>
			</View>
		);
	}
}


const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'

	},
	notificator: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-end',
		marginRight: 200
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#2F95D6',
		height: 40,
		padding: 20
	},

	map: {
		...StyleSheet.absoluteFillObject
	}
};

const mapStateToProps = state => {
	return {
		positions: state.fishmarks.fishmarks,
		selectedPosition: state.fishmarks.region,
		isSelected: state.fishmarks.selected,
		isFetching: state.fishmarks.isFetching,
		userLocation: state.user.position,
		sharedFishmarks: state.fishmarks.sharedFishmarks,
		receive: state.user.receive,
		duration:state.user.duration,
		emitStatus: state.user.emitStatus,
		socketIO: state.user.socketIO,
		timeoutID: state.user.timeoutID,
		intervalAlive: state.user.intervalAlive
	};
};

export default connect(mapStateToProps)(MainScreen);



