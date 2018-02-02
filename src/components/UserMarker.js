import React, { Component } from 'react';
import MapView from 'react-native-maps';

class UserMarker extends Component {


	render() {

		const region = {
			latitude: this.props.marker.latitude,
			longitude: this.props.marker.longitude

		};
		return (
			<MapView.Marker
				coordinate={region}
			>
			</MapView.Marker>
		);
	}
}

export default UserMarker;



