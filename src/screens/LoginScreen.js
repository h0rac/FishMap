import React from 'react'
import {View,Text, TouchableHighlight, StyleSheet, Image, Platform, TextInput, Keyboard, Dimensions,Alert} from 'react-native'
import SafariView from 'react-native-safari-view';
import PropTypes from 'prop-types'
import Icon from  'react-native-vector-icons/FontAwesome';
import {setUserData, login, checkAuthToken} from "../actions/user";
import {connect} from 'react-redux'
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements'

import {OAUTH_URL, API_ENDPOINT} from '../constants/constants'


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
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._DimensionHandler = this._DimensionHandler.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
        this.state = {
        }

    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        Dimensions.addEventListener("change", this._DimensionHandler);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        Dimensions.removeEventListener("change", this._DimensionHandler);
    }

    _keyboardDidShow () {
        console.log('Keyboard Shown');
        this.setState({keyboardShow:true})
    }

    _keyboardDidHide () {
        console.log('Keyboard Hidden');
        this.setState({keyboardShow:false})
    }

    _DimensionHandler (dims) {
        this.setState({window:dims});
    }

    componentDidMount () {
        this.props.dispatch(checkAuthToken(this.props.navigation))
        if(Platform.OS === "ios") {
            this.setState({ios:true})
        }
    }

    handleSubmit = () => {

        if(this.state.email && this.state.password) {
            const data = {
                email:this.state.email,
                password:this.state.password,
                navigation: this.props.navigation
            }
            this.props.dispatch(login(data))

        } else {
            console.log("false")
        }
    }

    handleErrors () {

        const error = this.props.message ? this.props.message:null
        console.log("Error", this.props.message)



        if(!this.props.result) {
            Alert.alert(
                'Account not exist',
                error,
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: true }
            )
        }else {

        }
    }


    render() {

        let mode = ""
        if(this.state.window) {
            const {width, height} = this.state.window;
           mode = this.state.window.screen.height > this.state.window.screen.width ? "portrait" : "landscape";
        }


        return (
        <View style={styles.mainContainer}>
            {mode && mode === "portrait" && !this.state.keyboardShow ?
            <View style={[styles.boxContainer, styles.boxImage]}>
                <Image source={require('../assets/fishmap-lightsky.png')}/>
            </View>
                :null}

             <View style={[styles.boxContainer, styles.boxInputs]}>
                    <TextInput  style={!this.state.ios ? styles.input:styles.inputIOS}
                               onChangeText={(email)=>this.setState({email:email})}
                               placeholder={"your@email.com"}
                               placeholderTextColor={"lightgray"}
                               underlineColorAndroid='#2F95D6'
                               selectionColor="white"/>
                    <TextInput style={!this.state.ios ? styles.input:styles.inputIOS}
                               secureTextEntry={true}
                               selectionColor="white"
                               placeholder={"password"}
                               placeholderTextColor={"lightgray"}
                               underlineColorAndroid='#2F95D6'
                               onChangeText={(password)=>this.setState({password:password})}/>
             </View>
            <View style={[styles.boxContainer, styles.loginBox]}>
                <Icon.Button
                    name="sign-in"
                    backgroundColor="steelblue"
                    style={styles.buttonLogin}
                    onPress={this.handleSubmit}>
                    Login
                </Icon.Button>
                <TouchableHighlight>
                    <Text>
                        Forgot password ?
                    </Text>
                </TouchableHighlight>

            </View>
             <View style={[styles.boxContainer, styles.signUpBox]}>
                    <Icon.Button
                        name="user-o"
                        backgroundColor="green"
                        style={styles.buttonSignUp}
                        >
                        Create new Account
                    </Icon.Button>

             </View>
        </View>
        )
    }
}


const styles = StyleSheet.create ({

    mainContainer: {
        flex:1, //ratio 1:1 whole screen
        justifyContent:"center",
        backgroundColor:"#2F95D6"

    },
    boxContainer: {
        flex:1,//ratio 3:num of boxes inside mainContainer

    },

    boxImage: {
        flex:2,
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"flex-end",
        //backgroundColor:"black",
        paddingTop:120

    },

    boxInputs: {
        flex:2,
        flexDirection:"column", //define axis Y
        backgroundColor:"white",
        paddingBottom:40,
        paddingTop:32,
        alignItems:"center",

    },
    loginBox: {
        flex:3,
        flexDirection:"column",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"space-around",

    },

    signUpBox: {
        flex:2,
        //backgroundColor:"red",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:"white"
    },

    button: {
        paddingVertical:5,
        width:100,

    },

    buttonLogin: {
        width:220,
    },
    buttonSignUp: {
        width:220,
    },

    labelForm: {
        color:"white",
    },
    input: {
        color:"black",
        width:220,
    },

    inputIOS: {
        color:"black",
        width:220,
        borderBottomColor:"#2F95D6", // for IOS
        borderBottomWidth:1, //for IOS
        height:50,
    },


})

const mapStateToProps = state => {

    console.log("State IN LOGIN SCREEN", state)
    return {
        message: state.user.error,
        result: state.user.success
    }
}

export default connect(mapStateToProps)(LoginScreen)