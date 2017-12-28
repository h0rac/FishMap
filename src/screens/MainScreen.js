import React, { Component, PropTypes } from 'react';
import FishMarker from '../components/FishMarker';
import UserMarker from '../components/UserMarker';

import {
	StyleSheet,
	View,
	Alert,
	Platform,
	Linking,
	AsyncStorage,
	Button,
	Text,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import MapView from 'react-native-maps';

import { setFishmark } from '../actions/fishmarks';
import { deleteFishmarkPosition } from '../actions/fishmarks';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { loadFishPositions, IOsetFishmarksCandidateList } from '../actions/fishmarks';
import { logout, getUserLocation } from '../actions/user';


import ioSocket from '../common/socket';

import { displayAlert } from '../common/utils';


const labelStyle =(props, alignSelf, marginTop)=> ({
	fontSize: 14,
	fontWeight: '500',
	marginTop,
	color: props.focused ? props.tintColor : "white",
});



class MainScreen extends Component {

	constructor() {
		super();

		this._handleFishMarkerSet = this._handleFishMarkerSet.bind(this);
		this._handleFishMarkPress = this._handleFishMarkPress.bind(this);
		this._handleLogout = this._handleLogout.bind(this);
		this._logoutUser = this._logoutUser.bind(this);
		this.onReceiveFishmark = this.onReceiveFishmark.bind(this);
		this.setInitialFishmarkPosition = this.setInitialFishmarkPosition.bind(this)
		this.setInitialUserPosition = this.setInitialUserPosition.bind(this)
		this.onReceiveError = this.onReceiveError.bind(this);

		this.state = {
			interval: 0
		};

	}

	onReceiveError = (error) => {
		console.log(error);
	};

	_logoutUser() {
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
					size={24}
					color={'white'}
					//style={{paddingLeft:20}}
				/>
		};
	};


	componentWillMount() {
		this.setState({ interval: this.props.ioSocketInterval });
	}


	componentDidMount() {
		AsyncStorage.getItem('token').then(token => {
			if (!token) {
				clearInterval(this.state.intervalId && this.state.intervalId);
				this.props.navigation.navigate('LoginScreen');
			}
			else {
				ioSocket.on('onReceiveFishmark', data => this.onReceiveFishmark(data));
				ioSocket.on('onReceiveError', data => this.onReceiveError(data.error));


				const intervalId = setInterval(() => ioSocket.emit('onFishmarkUpdate', { token: JSON.parse(decodeURI(token)), receive:this.props.receive }), this.state.interval);
				this.setState({ intervalId: intervalId });
				this.props.dispatch(getUserLocation());
				this.props.dispatch(loadFishPositions());
				this.props.navigation.setParams({ handleLogout: this._handleLogout });
			}
		});
	}


	onReceiveFishmark = (data) => {

		console.log("DATA", data)

		data.waypoints && !data.pause ? this.props.dispatch(IOsetFishmarksCandidateList(data.waypoints)) : null;
	};

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}


	_handleFishMarkerSet(e) {

		//console.log(typeof (e.nativeEvent.coordinate.latitude))
		this.props.dispatch(setFishmark({
			...e.nativeEvent.coordinate, latitudeDelta: 0.0922,
			longitudeDelta: 0.0421, title: 'Marker-' + e.nativeEvent.coordinate.latitude.toFixed(6),
			key: new Date().getTime(), date: new Date().toDateString()
		}));
	};


	_handleFishMarkPress = (e) => {
		const position = e.nativeEvent.coordinate;

		Alert.alert(
			'Waypoint',
			'What do you want to do with Waypoint ?',
			[
				{ text: 'Edit', onPress: () => this.props.navigation.navigate('WayPointEditScreen') },
				{ text: 'Delete', onPress: () => this.props.dispatch(deleteFishmarkPosition(position)) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: true }
		);
	};

	setInitialFishmarkPosition = () => {
		let initPosition = null;

		if (this.props.positions === undefined)
			this.props.positions = [];

		if (this.props.isSelected === true) {
			initPosition = this.props.selectedPosition;
		} else {
			if(this.props.positions.length > 0) {
				initPosition = this.props.positions[this.props.positions.length - 1];
			}
			else {
				initPosition = this.props.positions
			}
		}
		return initPosition
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

		const initFishmarkPosition = this.setInitialFishmarkPosition();
		const initUserPosition = this.setInitialUserPosition();

		return (
			<View style={styles.container}>
				<MapView onLongPress={this._handleFishMarkerSet}
					//onRegionChangeComplete={()=> this.props.dispatch(loadFishmarkPositions())}
								 ref="map"
								 style={styles.map}
								 region={initFishmarkPosition}>

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
		padding: 10
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
		ioSocketInterval: state.user.ioSocketInterval,
		receive: state.user.receive
	};
};

export default connect(mapStateToProps)(MainScreen);



