import React from 'react'
import {Text, View} from 'react-native'
import PropTypes from 'prop-types'

class WayPointEditScreen extends React.Component {

    static navigationOptions = {
        title: "Waypoint Editor",
        headerTintColor: '#2F95D6',
    }

    render() {
        return (
            <View>
                <Text>This is editor</Text>
            </View>)
        }
}

export default WayPointEditScreen