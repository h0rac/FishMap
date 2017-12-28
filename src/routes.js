import {StackNavigator, DrawerNavigator, TabNavigator, TabBarTop} from 'react-navigation'
import MainScreen from '../src/screens/MainScreen'
import ProfileScreen from '../src/screens/ProfileScreen'
import SettingScreen from '../src/screens/SettingScreen'
import WayPointScreen from '../src/screens/WayPointScreen'
import MarkerScreen from '../src/screens/MarkerScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import WayPointEditScreen from '../src/screens/WayPointEditScreen'
import LoginScreen from '../src/screens/LoginScreen'
import CreateAccountScreen from '../src/screens/CreateAccountScreen'
import {Badge} from 'react-native-elements'


const indicatorStyle = (props, alignSelf) => ({
	borderBottomWidth:3,
	borderBottomColor:"yellow",
	alignSelf: 'flex-end',
});

const mainStack = TabNavigator({

    MainScreen: {screen: MainScreen,

    },
    WayPointScreen: {screen:WayPointScreen,

    },
}, {
	tabBarComponent: (props)=> <TabBarTop {...props} indicatorStyle={indicatorStyle(props, 'flex-end')} />,
  tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon:true
    },
});



const NavigatorStack = StackNavigator({

    LoginScreen: {screen: LoginScreen,

    },
    CreateAccountScreen: {screen: CreateAccountScreen,

    },

    mainStack: {
        screen: mainStack,
    },
    WayPointEditScreen: {screen: WayPointEditScreen}
}, {
    mode:'modal'
});

const ProfileStack = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#2F95D6',
            },
            drawerLabel: 'Profile',
            headerTintColor: 'white',
            headerLeft: <Icon
                name="md-close"
                size={28}
                color={"white"}
                style={{paddingLeft:20}}
                onPress={() => navigation.navigate('DrawerOpen')}
            />

        })
    }


});



const SettingsStack = StackNavigator({
    Settings: {
        screen: SettingScreen,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#2F95D6',
            },
            drawerLabel: 'Settings',
            headerTintColor: 'white',
            headerLeft: <Icon
                name="md-close"
                size={28}
                color={"white"}
                style={{paddingLeft:20}}
                onPress={() => navigation.navigate('DrawerOpen')}
            />
        })
    },

});


const DrawerStack = DrawerNavigator({

    NavigatorStack: {screen: NavigatorStack,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Home',
            headerTintColor: '#2F95D6',
            drawerIcon: <Icon
                name="md-arrow-back"
                size={28}
                color={"#2F95D6"}
                onPress={() => navigation.navigate('MainScreen')}
            />
        })},
    ProfileStack: {
        screen: ProfileStack,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#2F95D6',
            drawerIcon: <Icon
                name="md-person"
                size={20}
                color={"#2F95D6"}
            />
        })
    },
    SettingsStack: {
        screen: SettingsStack,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#2F95D6',
            drawerIcon: <Icon
                name="md-settings"
                size={20}
                color={"#2F95D6"}
            />
        })
    },
});

export default DrawerStack
