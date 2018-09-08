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
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import {GRAPHQL_SERVER} from './src/constants/constants'

const client = new ApolloClient({
  uri: GRAPHQL_SERVER
})

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
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MenuProvider>
        <DrawerStack />
      </MenuProvider>
    </Provider>
  </ApolloProvider>
  );
}
}
