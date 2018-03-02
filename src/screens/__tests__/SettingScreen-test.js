import React from 'react';
import SettingScreen from '../SettingScreen';
import { AsyncStorage } from 'react-native';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import SocketIOClient from 'socket.io-client';
import mockedSocket from 'socket-io-mock';

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
	};
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
			user: { duration: 1000, receive: false }
		};
		const store = mockStore(state);
		dispatch = jest.fn();

		props = store;

		tree = shallow(
			<SettingScreen {...props} store={store} navigation={{ navigate }}
			/>, { lifecycleExperimental: true });
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});

	it('should render 1 Switch', () => {
		const SettingScreenCompononent = tree.dive();
		const switches = SettingScreenCompononent.find('Switch');
		expect(switches.length).toBe(1);
	});


	it('should start emit onFishmark update when switch is checked', () => {
		const SettingScreenCompononent = tree.dive();
		const switches = SettingScreenCompononent.find('Switch');
		const socket = new mockedSocket();
		SettingScreenCompononent.setProps({ emitStatus: true, socketIO: socket });
		switches.forEach(item => {
			if (item.getElement().key === 'waypointSwitch') {
				item.simulate('ValueChange');
				socket.socketClient.emit('onFishmarkUpdate', {
					token: JSON.parse(decodeURI('1234')),
					receive: true
				});
			}
		});
	});

	it('should stop emit onFishmark update when switch is unchecked', () => {
		const SettingScreenCompononent = tree.dive();
		const switches = SettingScreenCompononent.find('Switch');
		SettingScreenCompononent.setProps({ emitStatus: false });
		switches.forEach(item => {
			if (item.getElement().key === 'waypointSwitch') {
				item.simulate('ValueChange');
			}
		});
	});

	it('should move to Language screen when clicked Language setting', () => {
		const SettingScreenCompononent = tree.dive();
		const touchables = SettingScreenCompononent.find('TouchableOpacity');
		touchables.forEach(item => {
			if (item.getElement().key === 'language') {
				item.simulate('Press');
			}
		});
	});

});