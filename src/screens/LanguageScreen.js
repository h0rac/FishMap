import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

export class LanguageScreen extends Component {

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2F95D6'
		},
		title: 'Language',
		headerTintColor: 'white'
	};

	render() {
		return <Text>Hello in Language!</Text>;
	}
}

export default connect()(LanguageScreen);
