import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, Platform } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';

class Notificator extends Component {
constructor() {
super();

this.state = {
ios: false,
};
}

componentDidMount() {
if (Platform.OS === 'ios') {
this.setState({ ios: true });
}
}

render() {
return (
  <IconBadge
    MainElement={<IconAwesome
      name={this.props.type === 'waypoint' ? 'map-marker' : 'share-alt'}
      size={26}
      color="white"
    />}
    BadgeElement={
      <Text
        style={{ color: this.props.type === 'waypoint' ? 'yellow' : 'black' }}
      >{this.props.type === 'waypoint' ? this.props.sharedFishmarks && this.props.sharedFishmarks.length : this.props.myFishmarkWaypoints.length}
      </Text>
}
    IconBadgeStyle={
this.props.type === 'waypoint' ?
{
  top: !this.state.ios ? 1 : -3,
  left: !this.state.ios ? 4 : 11,
  minWidth: !this.state.ios ? 15 : 20,
  height: !this.state.ios ? 15 : 20,
  justifyContent: 'space-around',
  backgroundColor: '#E83535',
}
: {
  top: !this.state.ios ? 1 : -3,
  left: !this.state.ios ? 8 : 20,
  minWidth: !this.state.ios ? 15 : 20,
  height: !this.state.ios ? 15 : 20,
  justifyContent: 'space-around',
  backgroundColor: 'yellow',
}
}
    Hidden={this.props.type === 'waypoint' ? this.props.sharedFishmarks && this.props.sharedFishmarks.length === 0 : this.props.myFishmarkWaypoints && this.props.myFishmarkWaypoints.length === 0}
  />
);
}
}

const mapStateToProps = state => ({
sharedFishmarks: state.fishmarks.sharedFishmarks,
sharedFishmarksNumber: state.fishmarks.sharedFishmarksNumber,
myFishmarkWaypoints: state.fishmarks.myFishmarkWaypoints,
selectedSharedFishmarks: state.fishmarks.selectedSharedFishmarks,
});

export default connect(mapStateToProps)(Notificator);
