import React, {Component} from 'react';
import {Text,View,Image, TouchableHighlight, Platform} from 'react-native'

class MarkerScreen extends Component {

    static navigationOptions = {
        title: "Marker",
        headerTintColor: '#2F95D6',
    }

    render() {
        return <Text>Hello in Marker!</Text>;
    }
}
export default MarkerScreen