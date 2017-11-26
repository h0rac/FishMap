import React from 'react'
import {Text, View} from 'react-native'

class CreateAccountScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        title: "Create Account",
        drawerLockMode: 'locked-closed',
        headerTintColor: 'white',
    }

    render() {
        return (
            <View>
                <Text>This is new account page</Text>
            </View>)
    }
}

export default CreateAccountScreen