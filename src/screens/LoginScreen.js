import React from 'react'
import {View,Text, TouchableHighlight, StyleSheet, Image, Linking, Platform} from 'react-native'
import SafariView from 'react-native-safari-view';
import PropTypes from 'prop-types'
import Icon from  'react-native-vector-icons/FontAwesome';

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
        state = {
            user: undefined, // user has not logged in yet
        };
        this.navigateToFishMapApp = this.navigateToFishMapApp.bind(this)
    }

    handleOpenURL = ({ url }) => {
        // Extract stringified user string out of the URL
        const [, user_string] = url.match(/user=([^#]+)/);
        this.setState({
            // Decode the user string and parse it into JSON
            user: JSON.parse(decodeURI(user_string))
        });
        if (Platform.OS === 'ios') {
            SafariView.dismiss();
        }
    };

    loginWithGoogle = () => this.openURL(OAUTH_URL);



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
        // Add event listener to handle OAuthLogin:// URLs
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
    };

    navigateToFishMapApp = ()=> {
        this.props.navigation.navigate('MainScreen')
    }

    render() {
        const user = this.state;
        {console.log(user)}
        return (
        <View style={styles.container}>
            {!user ? <View>
                        <Image source={require('../assets/fishmap-lightsky.png')}/>
                        <Icon.Button
                            name="google"
                            backgroundColor="steelblue"
                            style={styles.icon}
                            onPress={this.loginWithGoogle}>
                            Login with Google
                        </Icon.Button>
                </View>
                    :
                    this.navigateToFishMapApp()
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





export default LoginScreen