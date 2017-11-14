import React from 'react'
import {View,Text, TouchableHighlight, StyleSheet, Image, Linking, Platform, AsyncStorage} from 'react-native'
import SafariView from 'react-native-safari-view';
import PropTypes from 'prop-types'
import Icon from  'react-native-vector-icons/FontAwesome';
import {setUserData} from "../actions/user";
import {connect} from 'react-redux'

import {OAUTH_URL} from '../constants/constants'

class LoginScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    static navigationOptions= {
        header: null,
        drawerLockMode: 'locked-closed'
    }
    constructor () {
        super()
        this.navigateToFishMapApp = this.navigateToFishMapApp.bind(this)

    }
    state = {
        user: undefined
    }

    handleOpenURL = ({ url }) => {
        // Extract stringified user string out of the URL
        const [, user_string] = url.match(/user=([^#]+)/);

        const data = JSON.parse(decodeURI(user_string))

        console.log("DATA", data)

        const userData = {
            username: data.username,
            avatar: data.avatar
        }

        this._setToken('token', JSON.stringify(data.token)).then(() => {
            this.props.dispatch(setUserData(userData))
        })


        if (Platform.OS === 'ios') {
            SafariView.dismiss();
        }
    };

    loginWithGoogle = () =>
        this.openURL(OAUTH_URL);


    openURL = (url) => {


        // Use SafariView on iOS
        if (Platform.OS === 'ios') {
            SafariView.show({
                url: url,
                fromBottom: true,
            });
        }
        // Or Linking.openURL on Android
        else {
            Linking.openURL(url);
        }
    };

    componentDidMount() {
        // Add event listener to handle OAuthLogin:// URL
        Linking.addEventListener('url', this.handleOpenURL);
        // Launched from an external URL


        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({ url });
            }
        });
    };

    componentWillUnmount() {
        // Remove event listener
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    async _getToken (token) {
        await AsyncStorage.getItem(token).then((data,err) => {
            console.log("from storage token", JSON.parse(decodeURI(data)))
            JSON.parse(decodeURI(data)) ? this.props.navigation.navigate('MainScreen'): err;
    })}


    navigateToFishMapApp = ()=> {
        this.props.navigation.navigate('MainScreen')

    }

     async _setToken(item, selectedValue) {
        console.log("selected value", selectedValue)
        try {
            await AsyncStorage.setItem(item, selectedValue);
            console.log("item set to AsyncStorage", selectedValue)
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    render() {

        return (
        <View style={styles.container}>
            {this._getToken('token') ? <View>
                        <Image source={require('../assets/fishmap-lightsky.png')}/>
                        <Icon.Button
                            name="google"
                            backgroundColor="steelblue"
                            style={styles.icon}
                            onPress={this.loginWithGoogle}>
                            Login with Google
                        </Icon.Button>
                </View>
                    : null
            }
        </View>
        )
    }
}


const styles = StyleSheet.create ({

    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#2F95D6"

    },
    icons: {
        borderRadius: 10,
        paddingVertical: 5
    }

})

const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps)(LoginScreen)