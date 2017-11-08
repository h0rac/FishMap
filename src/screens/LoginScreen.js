import React from 'react'
import {View,Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'
import Icon from  'react-native-vector-icons/FontAwesome';

class LoginScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    static navigationOptions= {
        header: null,
        drawerLockMode:'locked-closed'
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/fishmap-lightsky.png')}/>
                <Icon.Button
                    name="google"
                    backgroundColor="steelblue"
                    style={styles.icon}
                    onPress={() => this.props.navigation.navigate('MainScreen')}>
                    Login with Google
                </Icon.Button>
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