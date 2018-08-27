import 'react-native';
import React from 'react';
import UserMarker from '../UserMarker';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Testing UserMarker component', () => {

	let tree;
	beforeEach(() => {
        const marker =  {
            latitude: 54.475408,
            longitude: 18.263086
        }
        tree = shallow(
		<UserMarker marker={marker}/>);
	});
	it('renders correctly', () => {
		expect(tree).toMatchSnapshot();
	});
})