import { TextInput, Keyboard, Dimensions, Platform, Alert, AsyncStorage, StyleSheet } from 'react-native';
import React from 'react';
import MainScreen from '../MainScreen';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';


jest.mock('Alert', () => {
	return {
		alert: jest.fn()
	};
});


jest.mock('AsyncStorage', () => {
	return {
		getItem: jest.fn((item) => {
			return new Promise((resolve, reject) => {
				resolve('"1234"');
			});
		})
	};
});


jest.useFakeTimers();

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('react-native-vector-icons/Ionicons', () => ({}));

jest.mock('react-native-vector-icons/FontAwesome', () => ({}));


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
			fishmarks: { fishmarks: [] },
			user: { position: {}, duration: 1000 }

		};
		const store = mockStore(state);
		dispatch = jest.fn();

		props = store;

		tree = shallow(
			<MainScreen {...props} store={store} navigation={{ navigate }}
			/>, { lifecycleExperimental: true });
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});


	it('should set user initial position', () => {
		const MainScreenComponent = tree.dive();
		MainScreenComponent.setProps({
			userLocation: {
				latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		});
	});

	it('should invoke alert window on fishmark press', () => {
		const MainScreenComponent = tree.dive();
		const handleFishMarkPress = jest.spyOn(MainScreenComponent.instance(), '_handleFishMarkPress');
		handleFishMarkPress(event);
		expect(handleFishMarkPress).toBeCalledWith(event);
	});

	it('should invoke cancel on fishmark alert window', () => {
		Alert.alert.mock.calls[0][2][2].onPress();
	});


	it('should invoke delete on fishmark when user select delete from alert window', () => {
		Alert.alert.mock.calls[0][2][1].onPress();
	});

	it('should move to edit screen when user select edit from alert window', () => {
		Alert.alert.mock.calls[0][2][0].onPress();
		dispatch(navigate('WayPointEditScreen'));
		expect(dispatch).toHaveBeenCalled();
	});


	it('should set fishmark position when long press on Map', () => {
		const MainScreenComponent = tree.dive();
		const MapView = MainScreenComponent.find('MapView');
		MapView.first().simulate('LongPress', event);
	});


	it('should invoke onReceive using IO Socket with pause true', () => {
		const MainScreenComponent = tree.dive();
		const onReceive = jest.spyOn(MainScreenComponent.instance(), 'onReceiveFishmark');
		const data = { pause: true };
		onReceive(data);
		expect(onReceive).toHaveBeenCalledWith(data);
	});

	it('should invoke onReceive using IO Socket with pause false and waypoint available', () => {
		const MainScreenComponent = tree.dive();
		const onReceive = jest.spyOn(MainScreenComponent.instance(), 'onReceiveFishmark');
		const data = {
			waypoints: [{
				latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}]
		};
		onReceive(data);
	});


	it('should dispatch loadFishPositions action', () => {
		const MainScreenComponent = tree.dive();
		const componentDidMount = jest.spyOn(MainScreenComponent.instance(), 'componentDidMount');
		componentDidMount();
	});


	it('should have user token in AsyncStorage', () => {
		const MainScreenComponent = tree.dive();
		const componentDidMount = jest.spyOn(MainScreenComponent.instance(), 'componentDidMount');
		componentDidMount();
		expect(componentDidMount).toBeCalled();

		spyOn(MainScreenComponent.instance(), 'componentDidMount').and.returnValue(function () {
			return AsyncStorage.getItem('token');
		});
		expect(MainScreenComponent.instance().state.interval).not.toBe(null);
	});

	it('should not have token in AsyncStorage and redirect to LoginScreen', () => {
		const MainScreenComponent = tree.dive();

		spyOn(MainScreenComponent.instance(), 'componentDidMount').and.returnValue(function () {
			return AsyncStorage.getItem('fake');
		});
	});


});