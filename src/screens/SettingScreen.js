import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    FlatList, Dimensions, Image,Button, TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

class SettingScreen extends Component {

    static navigationOptions = {
        title: "Settings",
        headerTintColor: '#2F95D6',
    }
    static propTypes= {
        navigation: PropTypes.object,
    }

    onLayout () {
        const {width, height} = Dimensions.get('window')
    }


    render() {
        return (
            <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
                <FlatList
                    data={[
                        {key:1,name: 'Level 1', level:"Beginner", score:1313, date: 'Oct 31, 2017'},
                        {key:2,name: 'Level 2', level:"Rookie", score:2133, date: 'Oct 27, 2017'},
                        {key:3,name: 'Level 3', level:"Advanced", score:331, date: 'Jun 20, 2017'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.level}</Text>}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'mintcream'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    title: {
        backgroundColor: "black",
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    }
});


export default SettingScreen
