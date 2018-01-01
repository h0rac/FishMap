import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

class SideMenu extends Component {

	constructor() {
		super();
		this.navigateToScreen = this.navigateToScreen.bind(this);
	}


	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View>
						<Text style={styles.sectionHeadingStyle}>
							Section 1
						</Text>
						<View style={styles.navSectionStyle}>
							<Text style={styles.navItemStyle} onPress={this.navigateToScreen('mainStack')}>
								Home
							</Text>
						</View>
						<View style={styles.navSectionStyle}>
							<Text style={styles.navItemStyle} onPress={this.navigateToScreen('ProfileScreen')}>
								Profile
							</Text>
						</View>
					</View>
					<View>

						<View style={styles.navSectionStyle}>
							<Text style={styles.navItemStyle} onPress={this.navigateToScreen('SettingScreen')}>
								Settings
							</Text>
						</View>
					</View>
				</ScrollView>
				<View style={styles.footerContainer}>
					<Text>Author: Grzegorz Wypych</Text>
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
		flex: 1
	},
	navItemStyle: {
		padding: 10
	},
	navSectionStyle: {
		backgroundColor: 'white'
	},
	sectionHeadingStyle: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	footerContainer: {
		padding: 20,
		backgroundColor: '#2F95D6'
	}
};


export default SideMenu;
