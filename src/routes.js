import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation'
import MainScreen from '../src/screens/MainScreen'
import ProfileScreen from '../src/screens/ProfileScreen'
import SettingScreen from '../src/screens/SettingScreen'
import WayPointScreen from '../src/screens/WayPointScreen'
import MarkerScreen from '../src/screens/MarkerScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import WayPointEditScreen from '../src/screens/WayPointEditScreen'


const mainStack = TabNavigator({
    MainScreen: {screen: MainScreen,
        navigationOptions: ({navigation}) => ({
            title:'Fish Map',
            headerTintColor: '#2F95D6',
            headerLeft: <Icon
                name="md-menu"
                size={28}
                color={"#2F95D6"}
                style={{paddingLeft:20}}
                onPress={() => navigation.navigate('DrawerOpen')}
            />
        })
    },
    WayPointScreen: {screen:WayPointScreen,
    },
}, {
  tabBarPosition: 'bottom',
});

const NavigatorStack = StackNavigator({

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
            drawerLabel: 'Profile',
            headerTintColor: '#2F95D6',
            headerLeft: <Icon
                name="md-close"
                size={28}
                color={"#2F95D6"}
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
            drawerLabel: 'Settings',
            headerTintColor: '#2F95D6',
            headerLeft: <Icon
                name="md-close"
                size={28}
                color={"#2F95D6"}
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
