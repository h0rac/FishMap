import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import MainScreen from '../src/screens/MainScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import SettingScreen from '../src/screens/SettingScreen';
import WayPointScreen from '../src/screens/WayPointScreen';
import MarkerScreen from '../src/screens/MarkerScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import WayPointEditScreen from '../src/screens/WayPointEditScreen';
import LoginScreen from '../src/screens/LoginScreen';
import CreateAccountScreen from '../src/screens/CreateAccountScreen';
import { Badge } from 'react-native-elements';
import SideMenu from '../src/components/SideMenu'
import { LanguageScreen } from './screens/LanguageScreen';

const indicatorStyle = (props, alignSelf) => ({
	borderBottomWidth: 3,
	borderBottomColor: 'yellow',
	alignSelf: 'flex-end'
});

const mainStack = TabNavigator({

	MainScreen: {
		screen: MainScreen

	},

	WayPointScreen: {
		screen: WayPointScreen

	}
}, {
	tabBarComponent: (props) => <TabBarTop {...props} indicatorStyle={indicatorStyle(props, 'flex-end')}/>,
	tabBarPosition: 'bottom',
	tabBarOptions: {
		showIcon: true
	}
});


const NavigatorStack = StackNavigator({

	LoginScreen: {
		screen: LoginScreen

	},
	CreateAccountScreen: {
		screen: CreateAccountScreen

	},
	LanguageScreen: {
		screen: LanguageScreen

	},


	mainStack: {
		screen: mainStack
	},



	WayPointEditScreen: { screen: WayPointEditScreen },

	ProfileScreen: {
		screen: ProfileScreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			drawerLabel: 'Profile',
			headerTintColor: 'white',
			headerLeft: <Icon
				name="md-close"
				size={28}
				color={'white'}
				style={{ paddingLeft: 20 }}
				onPress={() => navigation.navigate('DrawerOpen')}
			/>

		})
	},
	SettingScreen: {
		screen: SettingScreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#2F95D6'
			},
			drawerLabel: 'Settings',
			headerTintColor: 'white',
			headerLeft: <Icon
				name="md-close"
				size={28}
				color={'white'}
				style={{ paddingLeft: 20 }}
				onPress={() => navigation.navigate('DrawerOpen')}
			/>
		})
	}


}, {

});



const DrawerStack = DrawerNavigator({

	NavigatorStack: {
		screen: NavigatorStack,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: 'Home',

		})
	},
	ProfileStack: {
		screen: ProfileScreen,
		navigationOptions: ({ navigation }) => ({
			headerTintColor: '#2F95D6',
			drawerIcon: <Icon
				name="md-person"
				size={20}
				color={'#2F95D6'}
			/>
		})
	},

}, {
	contentComponent: SideMenu,
	drawerWidth: 300
});

export default DrawerStack;
