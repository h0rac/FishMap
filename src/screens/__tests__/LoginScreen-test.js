
import React from 'react';
import LoginScreen from '../LoginScreen';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { checkAuthToken } from '../../actions/user';

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Login screen', () => {

	let tree;
	let navigate;
	let state;
	let props;
	let dispatch;

	beforeEach(() => {

		jest.mock('react-native', () => ({
			Platform: {
				OS:'ios',
				select: (obj: Object) => obj.ios,
			}}));

		navigate = jest.fn();
		state = {
			window: { screen: { height: 375, width: 667 } },
			email:'test@test.pl',
			password:null
		};
		dispatch = jest.fn();
		const store = mockStore(state);
		props=store
		tree = shallow(
			<LoginScreen {...props} store={store} navigation={{ navigate }} state={state}
			/>);
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});

	it('should show keyboard on listener event', () => {
		const LoginScreenComponent = tree.dive();
		LoginScreenComponent.setState({ keyboardShow: false });
		const keyboardDidShow = jest.spyOn(LoginScreenComponent.instance(), '_keyboardDidShow');
		keyboardDidShow();
		expect(LoginScreenComponent.state().keyboardShow).toBe(true);
	});

	it('should hide keyboard on listener event', () => {
		const LoginScreenComponent = tree.dive();
		LoginScreenComponent.setState({ keyboardShow: true });
		const keyboardDidHide = jest.spyOn(LoginScreenComponent.instance(), '_keyboardDidHide');
		keyboardDidHide();
		expect(LoginScreenComponent.state().keyboardShow).toBe(false);
	});

	it('should invoke dimension handler', () => {
		const LoginScreenComponent = tree.dive();
		const dimensionHandler = jest.spyOn(LoginScreenComponent.instance(), '_DimensionHandler');
		const window = { screen: { height: 375, width: 667 } };
		dimensionHandler(window);
	});

	it('should remove all listeners on component unmount', () => {
		const LoginScreenComponent = tree.dive();
		const componentWillUnmount = jest.spyOn(LoginScreenComponent.instance(), 'componentWillUnmount');
		componentWillUnmount();
		expect(componentWillUnmount).toHaveBeenCalled();
	});

	it('should work in portrait mode', () => {
		const LoginScreenComponent = tree.dive();
		LoginScreenComponent.setState({ window: { screen: { height: 667, width: 375 } } });
		const checkScreenOrientation = jest.spyOn(LoginScreenComponent.instance(), 'checkScreenOrientation');
		const mode = checkScreenOrientation();
		expect(mode).toEqual('portrait');
	});

	it('should work in landscape mode', () => {
		const LoginScreenComponent = tree.dive();
		LoginScreenComponent.setState({ window: { screen: { height: 375, width: 667 } } });
		const checkScreenOrientation = jest.spyOn(LoginScreenComponent.instance(), 'checkScreenOrientation');
		const mode = checkScreenOrientation();
		expect(mode).toEqual('landscape');
	});

	it('should dispatch verification of authentication token', () => {
		dispatch(checkAuthToken(navigate));
		expect(dispatch).toHaveBeenCalledWith(checkAuthToken(navigate));

	});


	it('should render 2 TextInputs', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		expect(inputs.length).toBe(2);
	});

	it('should render 2 Buttons', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('Button');
		expect(buttons.length).toBe(2);
	});

	it('should send API Request when email and password are valid', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('Button');
		LoginScreenComponent.setState({ email: 'test@test.com', password: 'pass123' });
		buttons.first().simulate('Press');
	});

	it('should not send API Request when email is invalid', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('Button');
		LoginScreenComponent.setState({ email: 'test#test.com', password: 'pass123' });
		buttons.first().simulate('Press');
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});

	it('should redirect to Create Account screen when create account button is pressed', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('Button');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'user-o')
				button.simulate('Press');
		});
	});


	it('input fields should not be empty', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		inputs.forEach(input => {
			input.simulate('ChangeText', 'test123');
		});
		expect(LoginScreenComponent.state().email).toBe('test123');
		expect(LoginScreenComponent.state().password).toBe('test123');
	});


	it('Login button should not be enabled when password is not provided', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.com', password: '' });
		inputs.forEach(input => {
			expect(input.simulate('ChangeText'));
		});
		const buttons = LoginScreenComponent.find('Button');
		buttons.forEach(button => {
			if(button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true)
		});
	});

	it('Login button should not be enabled when email is invalid', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.c', password: 'pass123' });
		inputs.forEach(input => {
			expect(input.simulate('ChangeText'));
		});
		const buttons = LoginScreenComponent.find('Button');
		buttons.forEach(button => {
			if(button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true)
		});
	});


	it('Login button should be enabled when email and password are valid', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		inputs.forEach(input => {
			expect(input.simulate('ChangeText', 'test@false.com'));
		});
		const buttons = LoginScreenComponent.find('Button');
		buttons.forEach(button => {
			if(button.getElement().props.name === 'sign-in')
			expect(button.getElement().props.disabled).toBe(false)
		});

		//expect(LoginScreenComponent.state().disableLogin).toBe(false)
	});


	it('Login button should not be enabled when email and password are invalid', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.c', password: '' });
		inputs.forEach(input => {
			expect(input.simulate('ChangeText'));
		});
		const buttons = LoginScreenComponent.find('Button');
		buttons.forEach(button => {
			if(button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true)
		});
	});

});