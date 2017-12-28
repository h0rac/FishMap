import { TextInput, Keyboard, Dimensions, Platform } from 'react-native';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';


configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('react-native-maps', () => ({}));
jest.mock('react-native-vector-icons/Ionicons', () => ({}));

jest.mock('react-native-vector-icons/FontAwesome', () => ({}));


describe('Testing Main screen', () => {

	let tree;
	let navigate;
	let state;
	let props;
	let dispatch;

	beforeEach(() => {
		navigate = jest.fn();
		state = {
			fishmarks: { fishmarks: [] },
			user: { position: {} }
		};
		dispatch = jest.fn();

		tree = shallow(
			<MainScreen store={mockStore(state)} navigation={{ navigate }}
			/>);
	});

	it('renders correctly', () => {
		expect(tree.dive()).toMatchSnapshot();
	});

	it('should set initial fishmark position to be empty', () => {
		const MainScreenComponent = tree.dive();
		const setInitialFishmarkPosition = jest.spyOn(MainScreenComponent.instance(), 'setInitialFishmarkPosition');
		const position = setInitialFishmarkPosition();
		expect(position.length).toBe(0)
	});

	it('should set initial fishmark to last position', () => {
		const MainScreenComponent = tree.dive();
		MainScreenComponent.setProps({positions:[{
				latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
				{
					latitude: 54.66666,
					longitude: 18.11111,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}]})
		const setInitialFishmarkPosition = jest.spyOn(MainScreenComponent.instance(), 'setInitialFishmarkPosition');
		const position = setInitialFishmarkPosition();
		expect(position).toEqual({
			latitude: 54.66666,
			longitude: 18.11111,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		})
	});

	it('should set initial fishmark to selected position', () => {
		const MainScreenComponent = tree.dive();
		MainScreenComponent.setProps({isSelected:true, selectedPosition:{latitude: 54.475408,
				longitude: 18.263086,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421}})
		const setInitialFishmarkPosition = jest.spyOn(MainScreenComponent.instance(), 'setInitialFishmarkPosition');
		const position = setInitialFishmarkPosition();
		expect(position).toEqual({
			latitude: 54.475408,
			longitude: 18.263086,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421})
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
		})
	})

});