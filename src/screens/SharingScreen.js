import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import SharedWaypoint from '../components/SharedWaypoint'
import { connect } from 'react-redux';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {shareWaypointToPeer} from '../actions/fishmarks'
import {shareToEmail} from '../actions/user'
import Notificator from '../components/Notificator'
import { Button } from 'react-native-elements';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


const labelStyle = (props, alignSelf, marginTop) => ({
	fontSize: 14,
	fontWeight: '500',
	marginTop,
	color: props.focused ? props.tintColor : 'white'
});

class SharingScreen extends React.Component {


	constructor() {
		super()

		this.state = {
			myShare:true,
			email:null,
		}
		this.validateEmail = this.validateEmail.bind(this)
	}

	validateEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};


	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {

			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			title: 'My Share',
			headerTintColor: 'white',
			tabBarLabel: (props) => (<Text style={labelStyle(props, 'flex-end', 15)}> My Share </Text>),
			tabBarIcon:
				<Notificator/>
		};
	};

	handleShareToPeer = () => {
		this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.length > 0 ?
		this.props.dispatch(shareWaypointToPeer(this.props.myFishmarkWaypoints, this.state.email)): null
	}

	render() {
		const email = this.state.email;
		const number = this.props.myFishmarkWaypoints.length
		console.log("NUMBER", number)
		return (
			<View style={styles.container}>
					<View style={styles.waypoints}>
						<FlatList
							data={this.props.myFishmarkWaypoints}
							renderItem={({ item }) => <SharedWaypoint myShare={this.state.myShare}
																									item={item}/>}
							keyExtractor={item => item.key}
						/>
					</View>
					<View style={styles.email}>
						<FormLabel>e-mail</FormLabel>
						<FormInput onChangeText={(email) => this.setState({email:email})}/>
						{email && email.length < 6 ?
						<FormValidationMessage>Invalid e-mail</FormValidationMessage>: null}
						<View style={styles.submit}>
							<Button
								rounded={true}
								disabled={!number > 0 || !email || !this.validateEmail(email) }
								onPress={this.handleShareToPeer}
								backgroundColor={ number > 0 || email || this.validateEmail(email)? 'green': 'gray'}
								title={'Submit'}
								icon={{name: 'check', type: 'font-awesome'}}>
							</Button>
						</View>
					</View>
			</View>)
	}
}

const mapStateToProps = state => {
	return {
		myFishmarkWaypoints: state.fishmarks.myFishmarkWaypoints
	};
};

export default connect(mapStateToProps)(SharingScreen);

const styles = {

	container: {
		flex:1,
		backgroundColor:'mintcream',
		flexDirection:'column',
	},

	waypoints: {
		flex:3,
		backgroundColor:'white',
		flexDirection:'column'
	},
	email: {
		flex:2,
		backgroundColor:'white',
		flexDirection:'column'
	},
	submit: {
		flex:1,
		flexDirection:'column',
		paddingLeft:20,
		paddingRight:20,
		paddingTop:40,
		paddingBottom:20,
		alignItems:'flex-end'
	},
}
