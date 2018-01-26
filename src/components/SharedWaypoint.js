import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';


import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { removeShareMyWaypoint } from '../actions/fishmarks';

import {
	Menu,
	MenuProvider,
	MenuOptions,
	MenuOption,
	MenuTrigger

} from 'react-native-popup-menu';



class SharedWaypoint extends Component {

	constructor() {
		super();
		this.state = {
			checked: null
		};
		this.renderMenuItem = this.renderMenuItem.bind(this)

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
		return (
			<View style={styles.row}>
				<View style={styles.iconLeft}>
					<Icon
						name='share-alt'
						type='font-awesome'
						size={20}
						color={'#2F95D6'}/>
				</View>
				<View style={styles.nameTitle}>
					<Text style={styles.name}>{this.props.item.title} </Text>
				</View>
				<View style={styles.levelTitle}>
					<Text style={styles.level}>{this.props.item.latitude}</Text>
					<Text style={styles.scoreDate}>{this.props.item.longitude}</Text>
				</View>
				<View style={styles.rightIcon}>
					<Menu opened={this.state.opened}>
						<MenuTrigger onPress={() => this.setState({ opened: true })}>
							<Icon
								name='more-vert'
								color={'green'}
								size={20}
								underlayColor={'mintcream'}
								containerStyle={{ backgroundColor: 'mintcream' }}

							/>
						</MenuTrigger>
						<MenuOptions>
							<View style={styles.contextDivider}/>
							<MenuOption onSelect={() => this.props.dispatch(removeShareMyWaypoint(this.props.item))}>
								{this.renderMenuItem('close', 'Remove from share', 'red')}
								<View style={styles.contextDivider}/>
							</MenuOption>
							<MenuOption onSelect={() => this.setState({ opened: false })}>
								{this.renderMenuItem('sign-out', 'Close', '#2F95D6')}
							</MenuOption>
						</MenuOptions>
					</Menu>
				</View>
			</View>)

	}
}

const styles = {

	iconLeft: {
		justifyContent: 'center',
		paddingLeft: 20,
		alignItems: 'flex-start'
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
		backgroundColor: 'mintcream',
		height: 70

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
		flex: 1.5,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	name: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	level: {
		fontSize: 10
	},
	levelTitle: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems: 'flex-end'

	},
	rightIcon: {
		width: 80,
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 20
	},
	scoreDate: {
		fontSize: 10,
		marginBottom: 5
	},
	scoreText: {
		fontSize: 10,
		marginTop: 8
	}
};

const mapStateToProps = state => {


	return {

	};
};

export default connect(mapStateToProps)(SharedWaypoint);

