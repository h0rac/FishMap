import React, {Component} from 'react';
import {Text,View,Image, TouchableHighlight, Platform} from 'react-native'

class SettingScreen extends Component {

    static navigationOptions = {
        title: "Settings",
        headerTintColor: '#2F95D6',
    }

    render() {
        return <Text>Hello in Settings!</Text>;
    }
}
export default SettingScreen
