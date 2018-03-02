/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import store from './src/store';
import DrawerStack from './src/routes';

/**
 * [store description]
 * @type {Object}
 */
export default class App extends Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
render() {
return (
  <Provider store={store}>
    <MenuProvider>
      <DrawerStack />
    </MenuProvider>
  </Provider>
  );
}
}
