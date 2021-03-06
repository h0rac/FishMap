/* global require */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types'

class FishMarker extends Component {
  render() {
    const region = {
      latitude: this.props.marker.latitude,
      longitude: this.props.marker.longitude,
    };
    return (
      <MapView.Marker
      key={this.props.index}
      coordinate={region}
      title={this.props.marker.title}
      image={require('../assets/perch.png')}
      onPress={this.props.callbackPress}
      identifier={this.props.title}
      />
    );
  }
}

FishMarker.propTypes = {
  marker: PropTypes.object,
  callbackPress: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number
}

export default FishMarker;
