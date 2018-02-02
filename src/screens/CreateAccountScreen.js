import React from 'react';
import { Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { createAccount, resendVerifyEmail } from '../actions/user';
import { displayAlert } from '../common/utils';
import { Button } from 'react-native-elements';

class CreateAccountScreen extends React.Component {

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2F95D6'
		},
		title: 'Create Account',
		drawerLockMode: 'locked-closed',
		headerTintColor: 'white'
	};

	constructor() {
		super();

		this.validateEmail = this.validateEmail.bind(this);
		this.resendVerificationEmail = this.resendVerificationEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);

		this.state = {
			email: null,
			password: null,
			repeatPassword: null,
			disableCreate: true
		};

	}

	handleCreate = () => {
		const data = {
			email: this.state.email,
			password: this.state.password,
			navigation: this.props.navigation
		};
		this.props.dispatch(createAccount(data));
	};

	validateEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	resendVerificationEmail = () => {
		if (!this.state.email) {
			displayAlert('Account', 'Please provide valid e-mail address');
		} else {
			const data = {
				email: this.state.email,
				navigation: this.props.navigation
			};
			this.props.dispatch(resendVerifyEmail(data));
		}
	};

	validatePassword = (password, repeatPassword) => {
		let inputStyle;
		if (password) {
			inputStyle = password.length < 8 || password !== repeatPassword ? styles.inputError : styles.inputCorrect;
		} else {
			inputStyle = styles.inputError;
		}
		return inputStyle;
	};

	render() {

		const password = this.state.password;
		const email = this.state.email;
		const repeatPassword = this.state.repeatPassword;
		const inputStyle = this.validatePassword(password, repeatPassword);

		return (
			<ScrollView>
			<View style={styles.container}>
				<View style={styles.inputContainer}>

						<View style={styles.textInput}>
							<Text style={styles.textEmail}>Login:</Text>
							<TextInput style={!this.validateEmail(email) ? styles.inputError : styles.inputCorrect}
							           onChangeText={(email) => this.setState({ email: email })}
							           placeholder={'your@email.com'}
							           placeholderTextColor={'lightgray'}
							           underlineColorAndroid='rgba(0,0,0,0)'
							           maxLength={40}/>
							<Text style={styles.textPassword}>Password:</Text>
							<TextInput style={inputStyle}
							           secureTextEntry={true}
							           placeholder={'password'}
							           underlineColorAndroid='rgba(0,0,0,0)'
							           placeholderTextColor={'lightgray'}
							           onChangeText={(password) => this.setState({ password: password })}
							           maxLength={40}/>
							{password && password !== repeatPassword && password.length < 8 ?
								<Text style={{ color: 'red', paddingTop: 5 }}>Password require minimum 8 characters</Text> : null}
							<Text style={styles.textRepeatPassword}>Repeat password:</Text>
							<TextInput style={inputStyle}
							           secureTextEntry={true}
							           placeholder={'repeat password'}
							           underlineColorAndroid='rgba(0,0,0,0)'
							           placeholderTextColor={'lightgray'}
							           onChangeText={(repeatPassword) => this.setState({ repeatPassword: repeatPassword })}
							           maxLength={40}/>
							{password && password !== repeatPassword ?
								<Text style={{ color: 'red', paddingTop: 5 }}>Password repeat field must be the same as
									password</Text> : null}
							<TouchableHighlight onPress={() => this.resendVerificationEmail()} underlayColor={null}>
								<Text style={styles.resend}>
									Resend verification e-mail
								</Text>
							</TouchableHighlight>
							<View style={styles.createButton}>
								<Button
									rounded={true}
									icon={{ name: 'sign-in', type: 'font-awesome' }}
									backgroundColor={
										(!this.validateEmail(this.state.email)) ||
										(!this.state.password || this.state.password.length < 8 || !this.state.repeatPassword || this.state.repeatPassword.length < 8 || this.state.password !== this.state.repeatPassword) ? 'gray' : 'green'}
									disabled={password !== repeatPassword || !password || !this.validateEmail(email) || !repeatPassword || password.length < 8 || repeatPassword < 8}
									onPress={this.handleCreate}
									title={'Create Account'}>
								</Button>
							</View>
						</View>

				</View>
			</View>
			</ScrollView>);
	}
}

const styles = {

	container: {
		flex: 1,
		flexDirection: 'column',

		alignItems: 'center'
	},

	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'mintcream'
	},

	createButton: {
		flex: 1,
		paddingTop: 40,
		paddingBottom: 40
	},

	textInput: {
		flex: 2,
		backgroundColor: 'mintcream',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20

	},

	labelContainer: {
		flex: 1,
		flexDirection: 'column',
		padding: 20
	},

	inputCorrect: {
		borderBottomWidth: 1,
		borderBottomColor: 'green',
		color: 'gray',
		paddingTop: 6,
		paddingBottom: 6
	},

	inputError: {
		borderBottomWidth: 1,
		borderBottomColor: 'red',
		color: 'gray',
		paddingTop: 6,
		paddingBottom: 6
	},

	textEmail: {
		paddingBottom: 5,
		color: 'gray'
	},

	textPassword: {
		paddingTop: 20,
		paddingBottom: 5,
		color: 'gray'
	},

	resend: {
		paddingTop: 20,
		color: '#2F95D6'
	},

	textRepeatPassword: {
		paddingTop: 20,
		paddingBottom: 5,
		color: 'gray'
	}
};

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps)(CreateAccountScreen);
