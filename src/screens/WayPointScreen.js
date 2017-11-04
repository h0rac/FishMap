import React, {Component} from 'react';
import {Text,View,Image, TouchableHighlight, Platform} from 'react-native'

class WayPointScreen extends Component {

    static navigationOptions = {
        title: "Waypoints",
        headerTintColor: '#2F95D6',
    }

    render() {
        return <Text>Hello in Waypoints!</Text>;
    }
}
export default WayPointScreen
