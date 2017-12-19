import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {StyleSheet,View,Alert,Platform, Linking, AsyncStorage,Button ,Text, TouchableHighlight, ActivityIndicator} from 'react-native'
import IconAwesome from 'react-native-vector-icons/FontAwesome'

import IconBadge from 'react-native-icon-badge'


class Notificator extends Component {


    render() {
        return (
            <IconBadge
                MainElement={<IconAwesome
                    name="map-marker"
                    size={24}
                    color={"white"}
                    //style={{paddingLeft:20}}
                />}
                BadgeElement={
                    <Text style={{color: 'white'}}>{this.props.sharedFishmarksNumber}</Text>
                }
                IconBadgeStyle={
                    {
                        top: 0,
                        right: -5,
                        minWidth: 15,
                        height: 15,
                        justifyContent: "space-around",
                        backgroundColor: 'red'
                    }
                }
                Hidden={this.props.sharedFishmarksNumber === 0}
            />
        )
    }
}
const mapStateToProps = state => {
    return {
        sharedFishmarks: state.fishmarks.sharedFishmarks,
        sharedFishmarksNumber: state.fishmarks.sharedFishmarksNumber,
        selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
    }
}

export default connect(mapStateToProps)(Notificator)