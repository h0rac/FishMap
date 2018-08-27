import 'react-native';
import React from 'react';
import WayPointEditScreen from '../WayPointEditScreen';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing WayPointEditScreen screen', () => {

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
			user: { position: {}, duration: 1000 },
			selectedPosition: {latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421}

		};
		const store = mockStore(state);
		dispatch = jest.fn();

		props = store;

		tree = shallow(
			<WayPointEditScreen {...props} store={store} navigation={{ navigate }}
			/>, { lifecycleExperimental: true });
	});
	it('renders correctly', () => {
		expect(tree).toMatchSnapshot();
	});

	it('should has WaypointEditList', () => {
		
	})
})