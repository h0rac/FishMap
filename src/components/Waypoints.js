import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Alert,
    View,
    Image,TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'


class Waypoints extends Component {

    constructor(){
        super()
        this.moveToFishWaypoint = this.moveToFishWaypoint.bind(this)
    }

    moveToFishWaypoint =(screen) => {
        const region = {latitude:this.props.item.latitude,
            latitudeDelta: this.props.item.latitudeDelta,
            longitude: this.props.item.longitude,
            longitudeDelta: this.props.item.longitudeDelta}

        this.props.callback(region,true);
        this.props.navigation.navigate(screen)


    }


    render() {
        return (
            <TouchableHighlight onPress={()=>this.moveToFishWaypoint('MainScreen')} underlayColor={"oldlace"}>
                <View  style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Icon name="md-boat" style={styles.icon}  color={"#2F95D6"} />
                    </View>
                    <View style={styles.nameTitle}>
                        <Text style={styles.name}>{this.props.item.title} </Text>
                    </View>
                    <View style={styles.levelTitle}>
                        <Text style={styles.level}>{this.props.item.latitude}</Text>
                        <Text style={styles.scoreDate}>{this.props.item.longitude}</Text>

                    </View>
                    <View style={styles.scoreTitle}>
                        <Text style={styles.scoreText}>{this.props.item.date}</Text>
                    </View>
                </View>
            </TouchableHighlight>)
    }
}


const styles = StyleSheet.create({

    iconContainer: {
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        width: 50,
    },
    icon: {
        height:22,
        width: 22,
        paddingTop:5
    },
    row: {
        borderColor: '#f1f1f1',
        borderBottomWidth:1,
        flexDirection:"row",
        marginLeft: 10,
        marginRight:10,
        paddingTop:20,
        paddingBottom:30,
    },
    nameTitle: {
        flex:1,
        justifyContent:'center'
    },
    name: {
        fontSize: 10,
        fontWeight:'bold'
    },
    level: {
        fontSize: 10,
    },
    levelTitle: {
        flex:1,
        justifyContent:'center'

    },
    scoreTitle: {
        width:80,
        paddingLeft: 20
    },
    scoreDate: {
        fontSize:10,
        marginBottom:5
    },
    scoreText: {
        fontSize:10,
        marginTop:8
    }
})

export default Waypoints