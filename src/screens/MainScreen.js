import React, {Component} from 'react';
import {Text,View,Image, TouchableHighlight, Platform} from 'react-native'
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class MainScreen extends Component {

    static navigationOptions = {
        title: "Main",
        headerTintColor: '#2F95D6',
    }

    render() {

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: 54.475408,
                        longitude: 18.263086,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>
            </View>
        )
    }
}

const styles = {
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
}


export default MainScreen
