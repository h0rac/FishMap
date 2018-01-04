import React from 'react'
import SettingScreen from '../screens/SettingScreen'
import {AsyncStorage} from 'react-native'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import SocketIOClient from "socket.io-client";

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('react-native-vector-icons/Ionicons', () => ({}));

jest.mock('react-native-vector-icons/FontAwesome', () => ({}));

jest.mock('AsyncStorage', () => {
	return {
		getItem: jest.fn((item) => {
			return new Promise((resolve, reject) => {
				resolve('"1234"');
			});
		})
	}
});


describe('Testing Main screen', () => {

	let tree;
	let navigate;
	let state;
	let props;
	let dispatch;

	const event = {
		nativeEvent: {
			coordinate: {
				latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		}
	};

	beforeEach(() => {
		navigate = jest.fn();
		state = {
			user: {duration: 1000, receive:false },
		};
		const store = mockStore(state);
		dispatch = jest.fn();

		props = store

		tree = shallow(
			<SettingScreen {...props} store={store} navigation={{ navigate }}
			/>, { lifecycleExperimental: true });
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});

	it('should render 1 Switch', () => {
		const SettingScreenCompononent = tree.dive();
		const switches = SettingScreenCompononent.find('Switch')
		expect(switches.length).toBe(1)
	})


	it('should start emit onFishmark update when checkbox is checked', () => {
		const SettingScreenCompononent = tree.dive();
		const checkboxes = SettingScreenCompononent.find('CheckBox')
		checkboxes.forEach(checkbox => {
			if (checkbox.getElement().props.title === 'Enable Fishmark Receive')
				checkbox.simulate('Press');
		});
	})

});