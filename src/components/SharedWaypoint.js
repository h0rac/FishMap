import React, { Component } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';


import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { removeShareMyWaypoint } from '../actions/fishmarks';
import Swipeout from 'react-native-swipeout';

class SharedWaypoint extends Component {

	constructor() {
		super();
		this.state = {
			checked: null
		};
		this.renderMenuItem = this.renderMenuItem.bind(this);
	}

	renderMenuItem = (icon, name, color) => {
		return (
			<View style={styles.menuItem}>
				<Icon name={icon} size={14} type='font-awesome' color={color}/>
				<Text style={{ paddingLeft: 10 }}>{name}</Text>
			</View>
		);
	};

	render() {

		const rightButtons = [
			{
				backgroundColor: '#e61b1b',
				underlayColor: '#e61b1b',
				onPress: () => this.props.dispatch(removeShareMyWaypoint(this.props.item)),
				component:
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={{ width: 26, height: 26 }}
								disabled={true}
								source={require('../assets/close-circle.png')}
								onPress={() => this.props.dispatch(removeShareMyWaypoint(this.props.item))}/>
							<Text style={{ color: 'white' }}>Remove</Text>
						</View>
					</View>
			}
		];
		const splitDate = this.props.item.date.split(' ');
		return (
			<Swipeout right={rightButtons} backgroundColor={'whitesmoke'} buttonWidth={60}>
				<View style={styles.row}>
					<View style={styles.nameTitle}>
						<Text style={styles.name}>{this.props.item.title} </Text>
					</View>
					<View style={styles.coords}>
						<Text style={styles.latitude}>{this.props.item.latitude}</Text>
						<Text style={styles.longitude}>{this.props.item.longitude}</Text>
					</View>
					<View style={styles.date}>
						<Text style={styles.year}>{splitDate[3]}</Text>
						<Text style={styles.month}>{`${splitDate[0]} ${splitDate[1]} ${splitDate[2]}`}</Text>
					</View>
				</View>
			</Swipeout>
		);

	}
}

const styles = {

	iconLeft: {
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center'
	},

	nameTitleShared: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},

	menuItem: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: 2,
		paddingTop: 2,
		paddingBottom: 2
	},

	animatedContainer: {
		flex: 1
	},

	icon: {
		height: 22,
		width: 22,
		paddingTop: 5
	},
	row: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'mintcream',
		height: 80

	},

	contextDivider: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1
	},

	rowBack: {
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		backgroundColor: 'mintcream',
		height: 70

	},

	nameTitle: {
		flex: 1,
		alignItems: 'flex-start',
		paddingLeft: 10,
		justifyContent: 'center'
	},
	name: {
		fontSize: 11,
		fontWeight: 'bold'
	},
	level: {
		fontSize: 11
	},
	coords: {
		flex: 1,
		alignItems: 'center',
		paddingRight: 10,
		justifyContent: 'center'
	},

	date: {
		flex: 0.5,
		alignItems: 'flex-end',
		paddingRight: 10,
		justifyContent: 'center'

	},

	rightIcon: {
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	latitude: {
		fontSize: 11
	},
	longitude: {
		fontSize: 11,
		marginTop: 2
	},

	year: {
		fontSize: 11,
		marginRight: 12
	},
	month: {
		fontSize: 11,
		marginTop: 2
	}

};
const mapStateToProps = state => {


	return {};
};

export default connect(mapStateToProps)(SharedWaypoint);

