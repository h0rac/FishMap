import React, {Component} from 'react';
import {Text,View,Image, TouchableHighlight, Platform} from 'react-native'

class ProfileScreen extends Component {

    static navigationOptions = {
        title: "Profile",
        headerTintColor: '#2F95D6',
    }

    render() {
        return <Text>Hello in Profile!</Text>;
    }
}
export default ProfileScreen
