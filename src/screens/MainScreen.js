import React, {Component, PropTypes} from 'react';
import FishMarker from '../components/FishMarker'
import UserMarker from '../components/UserMarker'

import {StyleSheet,View,Alert,Platform, Linking, AsyncStorage,Button ,Text, TouchableHighlight, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps';

import {setFishmark} from '../actions/fishmarks'
import {deleteFishmarkPosition} from "../actions/fishmarks";
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import {Badge} from 'react-native-elements'
import SafariView from 'react-native-safari-view';
import {loadFishPositions,IOsetFishmarksCandidateList} from "../actions/fishmarks";
import {logout,checkAuthToken, getUserLocation} from '../actions/user'
import  SocketIOClient from "socket.io-client";
import IconBadge from 'react-native-icon-badge'
import Test from '../components/Notificator'

import {API_ENDPOINT} from "../constants/constants";

import {displayAlert} from "../common/utils";


class MainScreen extends Component {

    constructor() {
        super()

        this._handleFishMarkerSet = this._handleFishMarkerSet.bind(this);
        this._handleFishMarkPress = this._handleFishMarkPress.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
        this._logoutUser = this._logoutUser.bind(this)
        this.onReceiveFishmark = this.onReceiveFishmark.bind(this)
        this.onRequestFishmark = this.onRequestFishmark.bind(this)
        this.onReceiveError = this.onReceiveError.bind(this)

    }

    onReceiveError = (error) => {
        console.log(error)
    }

     _logoutUser () {
        this.props.dispatch(logout())
           this.props.navigation.navigate('LoginScreen')

    }

    _handleLogout () {
        Alert.alert(
            'Logout',
            'Do you want to logout from FishMap ?',
            [
                {text: 'OK', onPress: () => this._logoutUser(), style: 'ok'},
                {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},
            ],
            { cancelable: true }
        )
    };

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;



        return {

            headerStyle: {
                backgroundColor: '#2F95D6',
            },
            title:'Fish Map',
            headerTintColor: 'white',
            headerLeft: <Icon
                name="md-menu"
                size={28}
                color={"white"}
                style={{paddingLeft:20}}
                onPress={() => navigation.navigate('DrawerOpen')}
            />,
            headerRight:
           <Icon
            name="md-exit"
            size={28}
            color={"white"}
            style={{paddingRight:20}}
            onPress={() => params.handleLogout()}
        />,
            tabBarIcon:
               <IconAwesome
                        name="home"
                        size={24}
                        color={"white"}
                        //style={{paddingLeft:20}}
                    />
        };
    };





    componentDidMount() {
        //this.props.dispatch(checkAuthToken(this.props.navigation))
        AsyncStorage.getItem('token').then(token => {
            if(!token) {
                this.props.navigation.pop()
            }
            else {
                this.ioSocket =  SocketIOClient(`ws://${API_ENDPOINT}`, { jsonp: false , transports: ['websocket'] }, );
                this.ioSocket.on('onReceiveFishmark', data => this.onReceiveFishmark(data));
                this.ioSocket.on("onReceiveError", data => this.onReceiveError(data.error))


                this.setState({intervalId: intervalId});
                const intervalId = setInterval(()=> this.ioSocket.emit("onFishmarkUpdate", {token:JSON.parse(decodeURI(token))}), 10000)
                this.props.dispatch(getUserLocation())
                this.props.dispatch(loadFishPositions())
                this.props.navigation.setParams({ handleLogout: this._handleLogout });
            }
        })
    }


    onReceiveFishmark = (data) => {

        data.waypoints ? this.props.dispatch(IOsetFishmarksCandidateList(data.waypoints)):null
    }

    onRequestFishmark = () => {

    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId);
        this.ioSocket.disconnect()
    }



    _handleFishMarkerSet(e) {

        //console.log(typeof (e.nativeEvent.coordinate.latitude))
        this.props.dispatch(setFishmark({...e.nativeEvent.coordinate,latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,title:"Marker-"+e.nativeEvent.coordinate.latitude.toFixed(6),
            key:new Date().getTime(), date:new Date().toDateString()}))
    };


    _handleFishMarkPress = (e) => {
        const position = e.nativeEvent.coordinate;

        Alert.alert(
            'Waypoint',
            'What do you want to do with Waypoint ?',
            [
                {text: 'Edit', onPress: () => this.props.navigation.navigate('WayPointEditScreen')},
                {text: 'Delete', onPress: () => this.props.dispatch(deleteFishmarkPosition(position))},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: true }
        )
    }


    render() {

        console.log("IN MAIN CANDIDATE LIST", this.props.sharedFishmarks)

        const region = {
            latitude: 54.475408,
            longitude: 18.263086,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let initPosition = null;

        const userPos = this.props.userLocation.latitude ? this.props.userLocation: null

        if(this.props.positions === undefined)
            this.props.positions = []


        if(userPos || this.props.positions.length === 0) {
            initPosition = userPos
        }
         if(this.props.isSelected === true) {
            initPosition = this.props.selectedPosition
        } else {
           initPosition = this.props.positions[this.props.positions.length-1]
        }

        return (
            <View style={styles.container}>
                <MapView onLongPress={this._handleFishMarkerSet}
                         //onRegionChangeComplete={()=> this.props.dispatch(loadFishmarkPositions())}
                         ref="map"
                         style={styles.map}
                         region={initPosition}>

                        { this.props.positions.map((marker,index) =>
                        <FishMarker key={index} marker={marker}
                                    callbackPress={this._handleFishMarkPress}
                                    />
                        )}
                    {this.props.userLocation.latitude ?
                        <UserMarker marker={userPos}/>:null }
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
    notificator: {
        flex:1,
        flexDirection:'column',
        alignItems:"flex-end",
        marginRight:200,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2F95D6',
        height:40,
        padding: 10,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },
};

const mapStateToProps = state => {
    return {
        positions: state.fishmarks.fishmarks,
        selectedPosition: state.fishmarks.region,
        isSelected: state.fishmarks.selected,
        isFetching: state.fishmarks.isFetching,
        userLocation: state.user.position,
        sharedFishmarks: state.fishmarks.sharedFishmarks,
    }
}

export default connect(mapStateToProps)(MainScreen)



