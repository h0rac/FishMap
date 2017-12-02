import {Alert, AsyncStorage} from "react-native";

export const displayAlert = (title, msg) => {
    Alert.alert(
        title,
        msg,
        [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
    )
}

export const getToken = token => (AsyncStorage.getItem(token))
export const removeToken = (token) => (AsyncStorage.removeItem(token))
export const setToken = (token) => AsyncStorage.setItem('token',JSON.stringify(token))