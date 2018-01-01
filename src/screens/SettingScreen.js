import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import {
	StyleSheet,
	Text,
	View,
	Slider,
	Picker,
	FlatList, Dimensions, Image, Button, TouchableHighlight, AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { setSelectedDuration, emitWaypointReceive } from '../actions/user';
import SaveSettings from '../components/SaveSettings'


class SettingScreen extends Component {


	constructor() {
		super()

		this.setEmit = this.setEmit.bind(this)
		this.setDurationTime = this.setDurationTime.bind(this)
		this.setDurationDisplay = this.setDurationDisplay.bind(this)
		this.setPicker = this.setPicker.bind(this)

		this.state = {
			interval: 5000,
			intervalId:null,
			emitStatus:false,
			durationSet:false,
			pickerValue:0,
		}
	}

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state;

		return {
			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			title:'Settings',
			headerTintColor: 'white',
			headerRight:
				<SaveSettings/>
		};
	};
	static propTypes = {
		navigation: PropTypes.object
	};


	setEmit () {
		if(this.props.emitStatus) {
			this.props.dispatch(emitWaypointReceive(false))
		}
		else {
			this.props.dispatch(emitWaypointReceive(true))
			AsyncStorage.getItem('token').then(token => {
				if (token) {
					this.props.socketIO.emit('onForceDisconnect', {token: JSON.parse(decodeURI(token))})
				}
			})

		}
	}


	setDurationTime (itemValue) {
		this.setState({pickerValue: itemValue})
		this.props.dispatch(setSelectedDuration(itemValue))
	}

	setDurationDisplay(value) {
		let display;
		console.log(value)
		if (value >= 60000 && value < 3600000) {
			display = 'm'
			value = Math.floor(value/1000/60)

		} else if (value >= 3600000) {
			display = 'h'
			value = Math.floor(value / 1000 / 60 / 60)
		} else {
			display = 's'
			value = value/1000
		}

		return ({value:value, display:display})
	}

	setPicker = () => {
		const durationObject = {
			'1 s':1000,
			'10 s':10000,
			'30 s':30000,
			'1 m':60000,
			'5 m':300000,
			'10 m':600000,
			'15 m':900000,
			'30 m':1800000,
			'1 h':3600000,
			'5 h':18000000,
			'10 h':36000000,
			'15 h':54000000,
			'1 day':86400000,
			'2 days':172800000
		};
		const picker = Object.keys(durationObject).map((item,index) => {
			return (<Picker.Item key={index} label={item} value={durationObject[item]} />)
		})
		return picker;
	}


	render() {

		return (
			<View style={styles.container}>
				<CheckBox
					title='Enable Fishmark Receive'
					checked={this.props.emitStatus}
					onPress={() => this.setEmit()}
					containerStyle={{ borderWidth: 0, borderColor: 'red' }}
				/>
				<Picker
					selectedValue={this.props.tempDuration ? this.props.tempDuration: this.props.duration}
					onValueChange={(itemValue, itemIndex) => this.setDurationTime(itemValue)}>
					{this.setPicker().map(item => item)}
				</Picker>
			</View>
		);
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
	}
});


const mapStateToProps = state => {
	return {
		duration: state.user.duration,
		receive: state.user.receive,
		emitStatus: state.user.emitStatus,
		tempDuration: state.user.tempDuration,
		socketIO: state.user.socketIO,
	};
};


export default connect(mapStateToProps)(SettingScreen);