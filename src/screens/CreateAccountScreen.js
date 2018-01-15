import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAccount } from '../actions/user';

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

		this.state = {
			email: null,
			password: null,
			repeatPassword: null,
			disableCreate:true,
		};

	}

	handleCreate = () => {
		const data = {
			email: this.state.email,
			password: this.state.password,
			navigation: this.props.navigation
		};
		this.props.dispatch(createAccount(data))
	}


	validateEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};


	render() {

		const password = this.state.password
		const email = this.state.email
		const repeatPassword = this.state.repeatPassword

		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<View style={styles.textInput}>
						<Text style={styles.textEmail}>Login:</Text>
						<TextInput style={styles.input}
											 onChangeText={(email) => this.setState({ email: email })}
											 placeholder={'your@email.com'}
											 placeholderTextColor={'lightgray'}
											 selectionColor="white"
											 maxLength={40}/>
						<Text style={styles.textPassword}>Password:</Text>
						<TextInput style={styles.input}
											 secureTextEntry={true}
											 selectionColor="white"
											 placeholder={'password'}
											 placeholderTextColor={'lightgray'}
											 onChangeText={(password) => this.setState({ password: password })}
											 maxLength={40}/>
						<Text style={styles.textRepeatPassword}>Repeat password:</Text>
						<TextInput style={styles.input}
											 secureTextEntry={true}
											 selectionColor="white"
											 placeholder={'repeat password'}
											 placeholderTextColor={'lightgray'}
											 onChangeText={(repeatPassword) => this.setState({ repeatPassword: repeatPassword })}
											 maxLength={40}/>
						<View style={styles.createButton}>
							<Icon.Button
								name="sign-in"
								backgroundColor={
									(!this.validateEmail(this.state.email)) ||
									(!this.state.password || this.state.password.length < 8 || !this.state.repeatPassword || this.state.repeatPassword.length < 8 || this.state.password !== this.state.repeatPassword) ? 'gray' : 'green'}
								disabled={password !== repeatPassword || !password || !this.validateEmail(email) || !repeatPassword || password.length < 8 || repeatPassword < 8}
								onPress={this.handleCreate}>
								Create Account
							</Icon.Button>
						</View>
					</View>
				</View>
			</View>);
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
		alignItems: 'flex-end',
		backgroundColor: 'mintcream'
	},

	createButton: {
		flex: 1,
		paddingTop: 40
	},

	textInput: {
		flex: 2,
		backgroundColor: 'mintcream',
		padding: 20

	},

	labelContainer: {
		flex: 1,
		flexDirection: 'column',
		padding: 20
	},

	input: {
		borderWidth: 1,
		borderColor: 'gray',
		backgroundColor: 'white',
		color: 'gray',
		padding: 6
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
