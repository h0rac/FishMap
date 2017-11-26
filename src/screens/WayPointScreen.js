import React, {Component} from 'react';
import {Text,View,FlatList,Image, TouchableHighlight, Platform, StyleSheet, Dimensions, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {moveToFishmarkPosition, loadFishWaypointsOnPush} from '../actions/fishmarks'

import Waypoints from '../components/Waypoints'

class WayPointScreen extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        title: "Waypoints",
        headerTintColor: 'white',

    }

    constructor() {
        super()
        this._handleMoveToFishmarkPostion = this._handleMoveToFishmarkPostion.bind(this);
        this._handlePushToRefresh = this._handlePushToRefresh.bind(this)
    }

    onLayout () {
        const {width, height} = Dimensions.get('window')
    }

    _handleMoveToFishmarkPostion = (region, selected) => {
        this.props.dispatch(moveToFishmarkPosition(region,selected))

    }

    _handlePushToRefresh = () => {
        this.props.dispatch(loadFishWaypointsOnPush())
    }


    render() {

        console.log("BEFOrE rENDeR WAYPOINTS IN WINDOW", this.props.positions.fishmarks)

       console.log("FROM STORE LOADED WAYPOINTS", this.props.loadedWaypoints)

       return( <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
            <FlatList
                data={this.props.loadedWaypoints.length > 0 ? this.props.loadedWaypoints : this.props.positions.fishmarks.slice(0,5).reverse()}
                renderItem={({item}) => <Waypoints navigation={this.props.navigation} item={item} callback={this._handleMoveToFishmarkPostion}/>}
                keyExtractor={item =>item.latitude}
                onRefresh={this._handlePushToRefresh}
                refreshing={this.props.refreshing}
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
        positions: state.fishmarks,
        loadedWaypoints: state.fishmarks.loadedWaypoints,
        refreshing: state.fishmarks.refreshing
    }
}


export default connect(mapStateToProps)(WayPointScreen)
