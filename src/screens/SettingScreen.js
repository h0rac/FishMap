import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Divider } from 'react-native-elements';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Switch,
  AsyncStorage
} from 'react-native';

import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
	emitWaypointReceive,
	setIntervalID,
} from '../actions/user';


class SettingScreen extends Component {


	constructor() {
		super();

		this.setEmit = this.setEmit.bind(this);

		this.state = {
			interval: 5000,
			intervalId: null,
			emitStatus: false,
			durationSet: false,
			color:'mintcream',
			pickerValue: 0
		};
	}

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state;

		return {
			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			title: 'Settings',
			headerTintColor: 'white',
		};
	};
	static propTypes = {
		navigation: PropTypes.object
	};


	setEmit() {
		if (this.props.emitStatus) {
			this.props.dispatch(emitWaypointReceive(false));
			AsyncStorage.getItem('token').then(token => {
				if (token) {
					const intervalId = setInterval(() => this.props.socketIO.emit('onFishmarkUpdate', {
						token: JSON.parse(decodeURI(token)),
						receive: this.props.receive
					}), this.props.duration);
					this.props.dispatch(setIntervalID(intervalId));
				}
			});
		}
		else {
			clearInterval(this.props.timeoutID);
			this.props.dispatch(emitWaypointReceive(true));

		}
	}


	render() {

		return (
			<View style={styles.container}>
				<View style={styles.section}>
					<Text style={styles.sectionText}>GENERAL</Text>
				</View>
				<View style={styles.generalContainer}>
					<View style={styles.generalText}>
						<Text style={styles.enableText}>Enable waypoint updates</Text>
					</View>
					<View style={styles.enableSwitch}>
						<Switch
							key={'waypointSwitch'}
							value={!this.props.emitStatus}
							onValueChange={() => this.setEmit()}
						/>
					</View>
				</View>
				<Divider style={{ height:0.5, backgroundColor: 'gray'}} />

				<TouchableOpacity key='language' style={styles.generalContainer} onPress={()=>this.props.navigation.navigate('LanguageScreen')}>

					<View style={styles.generalText}>
						<Text style={styles.enableText}>Language settings</Text>
					</View>
					<View style={styles.enableSwitch}>
						<IconAwesome
							name={'angle-right'}
							size={28}
							color={'gray'}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'whitesmoke',
		flexDirection:'column'
	},

	generalContainer: {
		flex: 0.1,
		flexDirection:'row',
		backgroundColor:'mintcream',
		alignItems:'center',
		height:70
	},


	itemContainer: {
		flex: 0.1,
		flexDirection:'row',
		backgroundColor:'mintcream',
		alignItems:'center',
		paddingBottom:5,
		paddingTop:5
	},

	section: {
		backgroundColor: 'whitesmoke',
		flex:0.05,
		paddingLeft:20,
		paddingTop:30,
		flexDirection:'row',
		alignItems:'center'
	},

	enableSwitch: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight:20

	},

	sectionText: {
		color:'gray'

	},

	generalText: {
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft:20
	},

	enableText: {
		paddingTop:5
	},

	title: {
		backgroundColor: 'black',
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		padding: 10,
		textAlign: 'center'
	}
});


const mapStateToProps = state => {
	return {
		duration: state.user.duration,
		receive: state.user.receive,
		emitStatus: state.user.emitStatus,
		tempDuration: state.user.tempDuration,
		socketIO: state.user.socketIO,
		timeoutID: state.user.timeoutID
	};
};


export default connect(mapStateToProps)(SettingScreen);