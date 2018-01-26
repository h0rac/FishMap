/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { MenuProvider } from 'react-native-popup-menu';

import DrawerStack from './src/routes';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MenuProvider>
				<DrawerStack/>
				</MenuProvider>
			</Provider>
		);
	}
}
