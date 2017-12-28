import 'react-native';
import React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen'
import renderer from 'react-test-renderer'


it('renders correctly', () => {
	const tree = renderer.create(<ProfileScreen />)
	expect(tree).toMatchSnapshot();
});