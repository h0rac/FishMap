import 'react-native';
import React from 'react';
import {EditedItem} from '../EditedItem';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Testing EditedItem component', () => {

	let tree;
	const onEdit = jest.fn()
	beforeEach(() => {
        const selectedPosition =  {
            fishType: 'perch',
            title: 'Marker'
        }
        tree = shallow(
		<EditedItem selectedPosition={selectedPosition} onEdit={onEdit} />);
	});
	it('renders correctly', () => {
		expect(tree).toMatchSnapshot();
	});
	it('should trigger edit event', () => {
		const component = tree.dive()
		const touchableOpacities = component.find('TouchableOpacity')
		touchableOpacities.forEach(opacity => {
			opacity.simulate('press')
		})
	})
})