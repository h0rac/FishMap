import React, {Component} from 'react';
import {Text,View,FlatList,Image, TouchableHighlight, Platform, StyleSheet, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {moveToFishmarkPosition} from '../actions/fishmarks'

import Waypoints from '../components/Waypoints'

class WayPointScreen extends Component {

    static navigationOptions = {
        title: "Waypoints",
        headerTintColor: '#2F95D6',

    }

    constructor() {
        super()
        this._handleMoveToFishmarkPostion = this._handleMoveToFishmarkPostion.bind(this);
    }

    onLayout () {
        const {width, height} = Dimensions.get('window')
    }

    _handleMoveToFishmarkPostion = (region, selected) => {
        this.props.dispatch(moveToFishmarkPosition(region,selected))

    }

    render() {
        console.log("Waypoints", this.props.positions.fishmarks)
       return( <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
            <FlatList
                data={this.props.positions.fishmarks}
                renderItem={({item}) => <Waypoints navigation={this.props.navigation} item={item} callback={this._handleMoveToFishmarkPostion}/>}
                keyExtractor={item =>item.latitude}
            />
        </View>)
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

const mapStateToProps = state => {
    return {
        positions: state.fishmarks
    }
}


export default connect(mapStateToProps)(WayPointScreen)
