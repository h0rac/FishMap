import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

export class ProfileScreen extends Component {

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2F95D6'
		},
		title: 'Profile',
		headerTintColor: 'white'
	};

	render() {
		return <Text>Hello in Profile!</Text>;
	}
}

export default connect()(ProfileScreen);
