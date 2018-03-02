import { TextInput,Platform } from 'react-native';
import React from 'react';
import CreateAccountScreen from '../CreateAccountScreen';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('Platform', () => {
		return {
			Platform: { OS: 'ios' }
		};
	}
);

describe('Testing CreateAccount screen', () => {

	let tree;
	let navigate;
	let state;
	let props;
	let dispatch;

	beforeEach(() => {
		navigate = jest.fn();
		state = {
			window: { screen: { height: 375, width: 667 } },
			email: 'test@test.pl',
			password: null,
			disableCreate: true
		};
		const store = mockStore(state);
		dispatch = jest.fn();
		props = store;
		tree = shallow(
			<CreateAccountScreen {...props} store={store} navigation={{ navigate }} state={state}
			/>);
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});

	it('should render 3 TextInputs', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		expect(inputs.length).toBe(3);
	});

	it('should render 1 createButton', () => {
		const CreateAccountScreenComponent = tree.dive();
		const buttons = CreateAccountScreenComponent.find('IconButton');
		expect(buttons.length).toBe(1);
	});


	it('input fields should not be empty', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			input.simulate('ChangeText', 'test123');
		});
		expect(CreateAccountScreenComponent.state().email).toBe('test123');
		expect(CreateAccountScreenComponent.state().password).toBe('test123');
	});

	it('should enable createButton when email is correct and password and repeatPassword are set', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		CreateAccountScreenComponent.setState({
			email: 'test@false.com',
			password: '12345678',
			repeatPassword: '12345678'
		});
		inputs.forEach(input => {
			input.simulate('ChangeText', 'test@false.com');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(false);
		});
	});


	it('should not enable createButton when email is correct and password and repeatPassword are not set', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});

	it('should not enable createButton when email is correct and password but repeatPassword is not set', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '12345678');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});


	it('should not enable createButton when email is correct and repeatPassword but password is not set', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '12345678');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});


	it('should not enable createButton when email is incorrect and repeatPassword and password are', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.c');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '12345678');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '12345678');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});

	it('should not enable createButton when email is correct and repeatPassword length is not correct', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '12345678');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '123456');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});


	it('should not enable createButton when email is correct and repeatPassword but password length is not correct', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '1234567');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '12345678');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});

	it('should not enable createButton when email is correct and repeatPassword and password length is correct but they are different', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '12375678');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '12345678');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(true);
		});
	});

	it('should enable createButton when email is correct and repeatPassword and password length is correct and they are same', () => {
		const CreateAccountScreenComponent = tree.dive();
		const inputs = CreateAccountScreenComponent.find('TextInput');
		inputs.forEach(input => {
			if (input.getElement().props.placeholder === 'your@email.com')
				input.simulate('ChangeText', 'test@false.com');
			if (input.getElement().props.placeholder === 'password')
				input.simulate('ChangeText', '12345678');
			if (input.getElement().props.placeholder === 'repeat password')
				input.simulate('ChangeText', '12345678');
		});
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.forEach(button => {
			if (button.getElement().props.name === 'sign-in')
				expect(button.getElement().props.disabled).toBe(false);
		});
	});

	it('should invoke create account button', () => {
		const CreateAccountScreenComponent = tree.dive();
		const buttons = CreateAccountScreenComponent.find('IconButton');
		buttons.first().simulate('Press');
	});


});