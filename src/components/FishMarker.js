import React, {PropTypes, Component} from 'react'
import MapView from 'react-native-maps';
import {StyleSheet,View,Image} from 'react-native'

import {setFishmark} from '../actions/fishmarks'
import {connect} from 'react-redux'

class FishMarker extends Component {

    static propTypes: {
        marker: PropTypes.object.required,
        index: PropTypes.int.required,
    };

    render() {

        const region = {
            latitude:this.props.marker.latitude,
            longitude: this.props.marker.longitude,

        };
        return (
            <MapView.Marker key={this.props.index}
                            coordinate={region}
                            title={this.props.marker.title}
                            image={require('../assets/perch.png')}
                            onPress={this.props.callback}
                            identifier={this.props.title}
                            >
            </MapView.Marker>
        )}
    }
export default FishMarker



