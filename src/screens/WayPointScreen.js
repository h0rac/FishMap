import React, {Component} from 'react';
import {Text,View,FlatList,Image, TouchableHighlight, Platform, StyleSheet, Dimensions, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {moveToFishmarkPosition} from '../actions/fishmarks'

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
        this.state = {
            refreshing:false,
            loadedWaypoints:[],
            seed:4
        }
    }

    onLayout () {
        const {width, height} = Dimensions.get('window')
    }

    _handleMoveToFishmarkPostion = (region, selected) => {
        this.props.dispatch(moveToFishmarkPosition(region,selected))

    }

    async _handlePushToRefresh () {

        console.log("ALL WAYPOINTS", this.props.positions.fishmarks)

        if(this.state.loadedWaypoints.length !== this.props.positions.fishmarks.length) {
            await this.setState({
                loadedWaypoints: this.props.positions.fishmarks.filter( (waypoint, index) => index <= this.state.seed).reverse(),
                refreshing:true
            })

            console.log("LOADED WAYPOINTS", this.state.loadedWaypoints)
            await this.setState({seed: this.state.seed +2, refreshing:false})
        }
        else {
            Alert.alert(
                'Waypoints',
                'No more waypoints to load',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: true }
            )
        }

    }

    render() {

        console.log("BEFOrE rENDeR WAYPOINTS IN WINDOW", this.props.positions.fishmarks)

       return( <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
            <FlatList
                data={this.state.loadedWaypoints.length > 0 ? this.state.loadedWaypoints : this.props.positions.fishmarks.slice(0,5).reverse()}
                renderItem={({item}) => <Waypoints navigation={this.props.navigation} item={item} callback={this._handleMoveToFishmarkPostion}/>}
                keyExtractor={item =>item.latitude}
                onRefresh={this._handlePushToRefresh}
                refreshing={this.state.refreshing}
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
