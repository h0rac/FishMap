import React, {Component} from 'react';
import {Text,View,FlatList,Image, TouchableHighlight, Platform, StyleSheet, Dimensions, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {moveToFishmarkPosition, loadFishWaypointsOnPush, shareWaypoint} from '../actions/fishmarks'
import Notificator from '../components/Notificator'

import Waypoints from '../components/Waypoint'

class WayPointScreen extends Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state;

        return {
            headerStyle: {
                backgroundColor: '#2F95D6',
            },
            title: "Waypoints",
            headerTintColor: 'white',
            tabBarIcon:
                <Notificator/>

        }


    }

    constructor() {
        super()
        this._handleMoveToFishmarkPostion = this._handleMoveToFishmarkPostion.bind(this);
        this._handlePushToRefresh = this._handlePushToRefresh.bind(this)
        this._shareWaypoint = this._shareWaypoint.bind(this)

    }
    componentDidMount () {
        this.props.navigation.setParams({bagdeNum: this.props.sharedFishmarks.length})
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

    _shareWaypoint = (data) => {
        this.props.dispatch(shareWaypoint(data))
    }


    render() {

       console.log("CANDIDATE LIST", this.props.sharedFishmarks)

       return( <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
            <FlatList
                data={this.props.loadedWaypoints.length > 0 ? this.props.loadedWaypoints : this.props.positions.fishmarks.slice(0,5).reverse()}
                renderItem={({item}) => <Waypoints navigation={this.props.navigation} item={item} callback={this._handleMoveToFishmarkPostion}
                shareWaypointCallback={this._shareWaypoint}/>}
                keyExtractor={item =>item.key}
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

    console.log("WAYPOINT SCREEN", state.fishmarks.sharedFishmarks)

    return {
        positions: state.fishmarks,
        loadedWaypoints: state.fishmarks.loadedWaypoints,
        refreshing: state.fishmarks.refreshing,
        sharedFishmarks: state.fishmarks.sharedFishmarks,
        sharedFishmarksNumber: state.fishmarks.sharedFishmarksNumber
    }
}


export default connect(mapStateToProps)(WayPointScreen)
