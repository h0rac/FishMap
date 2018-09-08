import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	Image,
	Platform,
	TextInput,
	Keyboard,
	Dimensions,
	Animated,
	Easing
} from 'react-native';
import {login, checkAuthToken} from '../actions/user';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import {gql} from 'apollo-boost';
import { Button } from 'react-native-elements';

const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`

class LoginScreen extends React.Component {

	static navigationOptions = {
		header: null,
		drawerLockMode: 'locked-closed'
	};

	constructor() {
		super();
		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
		this._DimensionHandler = this._DimensionHandler.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.checkScreenOrientation = this.checkScreenOrientation.bind(this);
		this.handleNewCreateAccount = this.handleNewCreateAccount.bind(this);
		this.state = {
			disableLogin: true,
			ios: false,
			login: false,
			email: null,
			password: null,
			scaleAnimation: new Animated.Value(1),
			opacityAnimation: new Animated.Value(1)
		};

	}

	componentWillMount() {
		Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
		Dimensions.addEventListener('change', this._DimensionHandler);
	}

	componentWillUnmount() {
		Keyboard.removeListener('keyboardDidShow');
		Keyboard.removeListener('keyboardDidHide');
		Dimensions.removeEventListener('change', this._DimensionHandler);
	}

	_keyboardDidShow() {
		this.setState({ keyboardShow: true });
	}

	_keyboardDidHide() {
		this.setState({ keyboardShow: false });
	}

	_DimensionHandler(dims) {
		this.setState({ window: dims });
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.setState({ ios: true });
		}
		// this.props.dispatch(checkAuthToken(this.props.navigation, 'LoginScreen'));
	}

	validateEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	handleSubmit = async () => {
		if (this.validateEmail(this.state.email) && this.state.password) {
			const data = {
				email: this.state.email,
				password: this.state.password,
				navigation: this.props.navigation
			};
			const { email, password } = this.state
			const result = await this.props.loginMutation({
				variables: {email, password }
			})
			//this.props.dispatch(login(data));

		} else {
			this.setState({ disableLogin: true });
		}
	};

	checkScreenOrientation = () => {
		let mode;
		if (this.state.window) {
			mode = this.state.window.screen.height > this.state.window.screen.width ? 'portrait' : 'landscape';
		}
		return mode;
	};

	startAnimation = () => {
		Animated.sequence([
			Animated.timing(this.state.scaleAnimation, { 	
				toValue:0, 
				duration:700,
				easing: Easing.back(1.5)
			}),
			Animated.timing(this.state.opacityAnimation, { toValue:0, duration:500})
		]).start(callback =>  {
			this.state.scaleAnimation.setValue(1);
			Animated.timing(this.state.opacityAnimation, { toValue:1, duration:1000}).start(),
			callback.finished === true ? this.props.navigation.navigate('CreateAccountScreen'): null;
		});	
	}

	handleNewCreateAccount = () => {
		this.startAnimation();
	};

	render() {

		let mode = this.checkScreenOrientation();
		const password = this.state.password;
		const email = this.state.email;

		const animatedStyles = { transform: [
			{ scaleX: this.state.scaleAnimation}
		], opacity: this.state.opacityAnimation}

		

		return (
			<View style={styles.mainContainer}>
				{mode !=='landscape' && !this.state.keyboardShow ?
					<View style={[styles.boxContainer, styles.boxImage]}>
						<Image source={require('../assets/fishmap-lightsky.png')}/>
					</View>
					: null}

				<View style={[styles.boxContainer, styles.boxInputs]}>
					<TextInput style={!this.state.ios ? styles.input : styles.inputIOS}
						onChangeText={(email) => this.setState({ email: email })}
						placeholder={'your@email.com'}
						placeholderTextColor={'lightgray'}
						underlineColorAndroid='#2F95D6'
						maxLength={40} />
					<TextInput style={!this.state.ios ? styles.input : styles.inputIOS}
						secureTextEntry={true}
						placeholder={'password'}
						placeholderTextColor={'lightgray'}
						underlineColorAndroid='#2F95D6'
						onChangeText={(password) => this.setState({ password: password })}
						maxLength={40} />
				</View>
				<View style={[styles.boxContainer, styles.loginBox]}>
						<Button
							rounded={true}
							icon={{name:"sign-in", type:'font-awesome'}}
							backgroundColor={
								(!this.validateEmail(this.state.email)) ||
								(!this.state.password) ? 'gray' : 'steelblue'}
							disabled={!password || !this.validateEmail(email)}
							title ={'Login'}
							onPress={this.handleSubmit}>
						</Button>
					<View style={styles.forgotPassBox}>
						<TouchableHighlight>
							<Text>
								Forgot password ?
							</Text>
						</TouchableHighlight>
					</View>

				</View>
				<View style={[styles.boxContainer, styles.signUpBox]}>
				<Animated.View style={[animatedStyles]}>
						<Button
							rounded={true}
							icon={{name:"user-o", type:'font-awesome'}}
							backgroundColor="green"
							onPress={() => this.handleNewCreateAccount()}
							title={'Create new Account'}
						>
						</Button>
					</Animated.View>
					</View>
			</View>
		);
	}
}


const styles = {

	mainContainer: {
		flex: 1, //ratio 1:1 whole screen
		justifyContent: 'center',
		backgroundColor: '#2F95D6'

	},
	boxContainer: {
		flex: 1//ratio 3:num of boxes inside mainContainer

	},

	boxImage: {
		flex: 2,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		//backgroundColor:"black",
		paddingTop: 120

	},

	forgotPassBox: {
		alignItems: 'center'
	},
	box: {
		width: 340,
		height: 20,
		backgroundColor: "tomato",
	},

	boxInputs: {
		flex: 2,
		flexDirection: 'column', //define axis Y
		backgroundColor: 'white',
		paddingBottom: 40,
		paddingTop: 32,
		paddingLeft: 10,
		paddingRight: 10


	},
	loginBox: {
		flex: 3,
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'space-around',
		paddingLeft: 10,
		paddingRight: 10

	},

	signUpBox: {
		flex: 2,
		//backgroundColor:"red",
		justifyContent: 'space-around',
		backgroundColor: 'white',
		paddingLeft: 10,
		paddingRight: 10
	},

	button: {
		paddingVertical: 5
	},

	labelForm: {
		color: 'white'
	},
	input: {
		color: 'gray'

	},

	inputIOS: {
		color: 'gray',
		borderBottomColor: '#2F95D6', // for IOS
		borderBottomWidth: 1, //for IOS
		height: 50
	}

};

export default graphql(loginMutation, { name: 'loginMutation' })(LoginScreen);
