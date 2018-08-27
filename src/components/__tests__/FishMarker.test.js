import 'react-native';
import React from 'react';
import FishMarker from '../FishMarker';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Testing FishMarker component', () => {

	let tree;
	beforeEach(() => {
        const marker =  {
            latitude: 54.475408,
            longitude: 18.263086
        }
        tree = shallow(
		<FishMarker marker={marker}/>);
	});
	it('renders correctly', () => {
		expect(tree).toMatchSnapshot();
	});
})