import { TextInput, Keyboard, Dimensions, Platform } from 'react-native';
import React from 'react';
import LoginScreen from '../LoginScreen';
import TestUtils from 'react-dom/test-utils';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { checkAuthToken } from '../../actions/user';

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('Platform', () => {
		return {
			Platform: { OS: 'ios' }
		}
	}
)

describe('Testing Login screen', () => {

	let tree;
	let navigate;
	let state;
	let props;
	let dispatch;

	beforeEach(() => {
		navigate = jest.fn();
		state = {
			window: { screen: { height: 375, width: 667 } }
		};
		dispatch = jest.fn();
		props = {
			dispatch
		};
		tree = shallow(
			<LoginScreen {...props} store={mockStore()} navigation={{ navigate }} state={state}
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

	it('should render 2 IconButtons', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('IconButton');
		expect(buttons.length).toBe(2);
	});

	it('should send API Request when email and password are valid', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('IconButton');
		LoginScreenComponent.setState({ email: 'test@test.com', password: 'pass123' });
		buttons.first().simulate('Press');
	});

	it('should not send API Request when email is invalid', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('IconButton');
		LoginScreenComponent.setState({ email: 'test#test.com', password: 'pass123' });
		buttons.first().simulate('Press');
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});

	it('should redirect to Create Account screen when create account button is pressed', () => {
		const LoginScreenComponent = tree.dive();
		const buttons = LoginScreenComponent.find('IconButton');
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


	it('Login button should be enabled when email and password is provided', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.com', password: 'pass123' });
		inputs.forEach(input => {
			expect(input.simulate('Change'));
		});
		expect(LoginScreenComponent.state().disableLogin).toBe(false);
	});

	it('Login button should not be enabled when email and password are not provided', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: '', password: '' });
		inputs.forEach(input => {
			expect(input.simulate('Change'));
		});
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});


	it('Login button should not be enabled when email is not provided', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: '', password: 'pass123' });
		inputs.forEach(input => {
			expect(input.simulate('Change'));
		});
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});

	it('Login button should not be enabled when password is not provided', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.com', password: '' });
		inputs.forEach(input => {
			expect(input.simulate('Change'));
		});
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});

	it('Login button should not be enabled when email is invalid', () => {
		const LoginScreenComponent = tree.dive();
		const inputs = LoginScreenComponent.find('TextInput');
		LoginScreenComponent.setState({ email: 'test@false.c', password: 'pass123' });
		inputs.forEach(input => {
			expect(input.simulate('Change'));
		});
		expect(LoginScreenComponent.state().disableLogin).toBe(true);
	});

});