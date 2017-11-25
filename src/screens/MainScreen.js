import React, {Component, PropTypes} from 'react';
import FishMarker from '../components/FishMarker'
import UserMarker from '../components/UserMarker'

import {StyleSheet,View,Alert,Platform, Linking, AsyncStorage, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps';

import {setFishmark} from '../actions/fishmarks'
import {deleteFishmarkPosition} from "../actions/fishmarks";
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import SafariView from 'react-native-safari-view';
import {loadFishPositions} from "../actions/fishmarks";
import {logout,checkAuthToken, getUserLocation} from '../actions/user'

class MainScreen extends Component {

    constructor() {
        super()

        this._handleFishMarkerSet = this._handleFishMarkerSet.bind(this);
        this._handleFishMarkPress = this._handleFishMarkPress.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
        this._logoutUser = this._logoutUser.bind(this)
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
            headerRight:
           <Icon
            name="md-exit"
            size={28}
            color={"white"}
            style={{paddingRight:20}}
            onPress={() => params.handleLogout()}
        />
        };
    };


    componentDidMount() {
        //this.props.dispatch(checkAuthToken(this.props.navigation))

        AsyncStorage.getItem('token').then(token => {
            if(!token) {
                this.props.navigation.pop()
            }
        })
        this.props.dispatch(getUserLocation())
        this.props.dispatch(loadFishPositions())
        this.props.navigation.setParams({ handleLogout: this._handleLogout });
    }


    _handleFishMarkerSet(e) {

        //console.log(typeof (e.nativeEvent.coordinate.latitude))
        this.props.dispatch(setFishmark({...e.nativeEvent.coordinate,latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,title:"Marker-"+e.nativeEvent.coordinate.latitude.toFixed(6),
            key:this.props.positions.fishmarks.length, date:new Date().toDateString()}))
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

        console.log("User position", this.props.userLocation)


        const region = {
            latitude: 54.475408,
            longitude: 18.263086,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let initPosition = null;

        const userPos = this.props.userLocation.latitude ? this.props.userLocation: null

        if(this.props.positions.fishmarks === undefined)
            this.props.positions.fishmarks = []

        console.log("UserPos", userPos)

        if(userPos || this.props.positions.fishmarks.length === 0) {
            initPosition = userPos
        }
         if(this.props.isSelected === true) {
            initPosition = this.props.selectedPosition
        } else {
           initPosition = this.props.positions.fishmarks[this.props.positions.fishmarks.length-1]
        }

        return (
            <View style={styles.container}>
                <MapView onLongPress={this._handleFishMarkerSet}
                         //onRegionChangeComplete={()=> this.props.dispatch(loadFishmarkPositions())}
                         ref="map"
                         style={styles.map}
                         region={initPosition}>

                        { this.props.positions.fishmarks.map((marker,index) =>
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
    indicator: {
        flex:2,
        justifyContent: "center",
        alignItems: "center",
    },

    map: {
        ...StyleSheet.absoluteFillObject
    },
};

const mapStateToProps = state => {
    return {
        positions: state.fishmarks,
        selectedPosition: state.fishmarks.region,
        isSelected: state.fishmarks.selected,
        isFetching: state.fishmarks.isFetching,
        userLocation: state.user.position
    }
}

export default connect(mapStateToProps)(MainScreen)



