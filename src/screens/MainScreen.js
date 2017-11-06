import React, {Component} from 'react';
import FishMarker from '../components/FishMarker'

import {StyleSheet,View,Alert} from 'react-native'
import MapView from 'react-native-maps';

import {setFishmark} from '../actions/fishmarks'
import {connect} from 'react-redux'

class MainScreen extends Component {

    static navigationOptions = {
        title: "Map",
        headerTintColor: '#2F95D6',
    };

    constructor(props) {
        super(props)

        this._handleFishMarkerSet = this._handleFishMarkerSet.bind(this)
        this._handleFishMarkPress = this._handleFishMarkPress.bind(this)

    }

    _handleFishMarkerSet(e) {

        this.props.dispatch(setFishmark({...e.nativeEvent.coordinate,latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,title:"Marker"+this.props.positions.fishmarks.length.toString(),
            key:this.props.positions.fishmarks.length, date:new Date().toDateString()}))
    };

    _handleFishMarkPress = (e) => {
        console.log("Press on mark works", e.nativeEvent)
    }

    render() {

        const region = {
            latitude: 54.475408,
            longitude: 18.263086,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let initPosition = null;
        if(this.props.positions.fishmarks.length === 0) {
            initPosition = region;
        }else if(this.props.isSelected === true) {
            initPosition = this.props.selectedPosition
        } else {
            initPosition = this.props.positions.fishmarks[this.props.positions.fishmarks.length-1]
        }


        return (
            <View style={styles.container}>
                <MapView onPress={this._handleFishMarkerSet}
                         ref="map"
                         style={styles.map}
                         region={initPosition}>
                    {this.props.positions.fishmarks.map((marker,index) =>
                        <FishMarker key={index} marker={marker} callback={this._handleFishMarkPress}/>
                    )}
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
    },
};

const mapStateToProps = state => {
    return {
        positions: state.fishmarks,
        selectedPosition: state.fishmarks.region,
        isSelected: state.fishmarks.selected
    }
}

export default connect(mapStateToProps)(MainScreen)



