import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

class SideMenu extends Component {

	constructor() {
		super();
		this.navigateToScreen = this.navigateToScreen.bind(this);
		this.renderItems = this.renderItems.bind(this);

		this.state = {
			items : [
				{leftIcon:'home', rightIcon:'angle-right',screen:'mainStack', title:'Home'},
				{leftIcon:'gear', rightIcon:'angle-right',screen:'SettingScreen', title:'Settings'},
				{leftIcon:'user-circle', rightIcon:'angle-right',screen:'ProfileScreen', title: 'Profile'},
				{leftIcon:'info-circle', rightIcon:'angle-right',screen:'InfoScreen', title: 'Info'},
			],
			routes:[]
		}
	}


	navigateToScreen = (route) => () => {

		const navigateAction =  NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	};

	renderItems () {

		return this.state.items.map((item, index) =>
			<View key={index}>
				<TouchableOpacity onPress={this.navigateToScreen(item.screen)}>
					<View style={styles.navSectionStyle}>
						<View style={styles.iconLeft}>
							<IconAwesome
								name={item.leftIcon}
								size={28}
								color={'gray'}
							/>
						</View>

						<Text style={styles.navItemStyle}>
							{item.title}
						</Text>
						<View style={styles.iconRight}>
							<IconAwesome
								name={item.rightIcon}
								size={28}
								color={'gray'}
							/>
						</View>
					</View>
				</TouchableOpacity>
				<Divider style={{ height: 0.5, backgroundColor: 'gray' }}/>
			</View>
		)
	}

	render() {
		const date = this.state.date
		return (
			<View style={styles.container}>
				<ScrollView>
							<View style={styles.avatar}>
								<Avatar
									large
									rounded
									source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
									onPress={() => console.log('Works!')}
									activeOpacity={0.7}
								/>
							</View>
					{this.renderItems()}

				</ScrollView>
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>&copy; {new Date().getFullYear()} Grzegorz Wypych All Rights Reserved</Text>
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

styles = {
	container: {
		paddingTop: 20,
		flex: 1,
		backgroundColor: 'whitesmoke'
	},

	avatar: {
		flex: 5,
		backgroundColor: '#2F95D6',
		alignItems: 'center',
		paddingTop: 30,
		paddingBottom: 30
	},

	iconLeft: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		paddingLeft:20
	},

	navItemStyle: {
		paddingTop: 14,
		flex: 4
	},
	navSectionStyle: {
		backgroundColor: 'mintcream',
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 10,
		paddingTop: 10
	},

	iconRight: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: 20,
		paddingTop: 10

	},

	sectionHeadingStyle: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	footerContainer: {
		padding: 10,
		backgroundColor: '#2F95D6',
		flex:0.,
	},
	footerText: {
		color:'white',
		fontSize:12,
		paddingLeft:20
	}
};


export default SideMenu;
