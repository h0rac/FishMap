import React from 'react'
import {Text, View} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

const labelStyle =(props, alignSelf, marginTop)=> ({
	fontSize: 14,
	fontWeight: '500',
	marginTop,
	color: props.focused ? props.tintColor : "white",
});



class SharingScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {

			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			title:'My Share',
			headerTintColor: 'white',
			tabBarLabel: (props)=>(<Text style={labelStyle(props, 'flex-end', 15)}> My Share </Text>),
			tabBarIcon:
				<IconAwesome
					name="share-alt"
					size={24}
					color={'white'}
					//style={{paddingLeft:20}}
				/>
		};
	};

	render() {
		return (
			<View>
				{this.props.myFishmarkWaypoints.map((waypoint, index) =>
						<Text key={index}>{waypoint.title}</Text>)}
			</View>)
	}
}

const mapStateToProps = state => {
	return {
		myFishmarkWaypoints: state.fishmarks.myFishmarkWaypoints
	}
}

export default connect(mapStateToProps)(SharingScreen)
