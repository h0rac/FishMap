import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {EditedItem} from '../../src/components/EditedItem'
import { Button } from 'react-native-elements';

class WayPointEditScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#2F95D6'
    },
    title: 'Waypoint Editor',
    headerTintColor: 'white'
  };

  constructor() {
    super()
    this.state = {
      modalVisible: false,
      ios: false,
      inputValue: null
    }
  }

  componentDidMount() {
		if (Platform.OS === 'ios') {
			this.setState({ ios: true });
    }
  }

  setModalVisible = (status) => {
    this.setState({modalVisible: status})
  }

  handleEdit = (data) => {
    this.setState({modalVisible: !this.state.modalVisible, inputValue: data})
  }

render() {
	return (
    <View style={styles.container}>
    <View style={styles.section}>
    <Text style={styles.sectionText}>Waypoint data</Text>
    </View>
      <EditedItem selectedPosition={this.props.selectedPosition} onEdit={this.handleEdit.bind(this)}/>
      <Modal isVisible={this.state.modalVisible}>
          <View style={{ flex: 1, justifyContent:'center', flexDirection:'column'}}>
            <View style={{flex: 1, backgroundColor: 'white', justifyContent:'center', borderWidth:1, borderRadius:15}}>
            <View style={{flex:0.2, flexDirection:'column', justifyContent:'center', alignItems:'center', borderBottomWidth:1, marginBottom:16}}>
              <Text>Here you can edit your fishmark data and save</Text>
            </View>
            <TextInput style={!this.state.ios ? styles.input : styles.inputIOS}
              onChangeText={(email) => this.setState({ email: email })}
							value={this.state.inputValue}
							placeholderTextColor={'lightgray'}
							underlineColorAndroid='#2F95D6'
							maxLength={40}/>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Button
              rounded={true}
              icon={{name:"check", type:'font-awesome'}}
              backgroundColor="green"
              onPress={() => this.setState({modalVisible: false})}
              title={'Confirm'}
            >
            </Button>
            <Button
              rounded={true}
              icon={{name:"times", type:'font-awesome'}}
              backgroundColor="red"
              onPress={() => this.setState({modalVisible: false})}
              title={'Cancel'}
            >
            </Button>
          </View>
            </View>
          </View>
        </Modal>
    </View>
    
    )
  }
}
WayPointEditScreen.propTypes = {
  selectedPosition: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    flexDirection: 'column'
  },
  input: {
		color: 'gray'

	},

	inputIOS: {
		color: 'gray',
		borderBottomColor: '#2F95D6', // for IOS
		borderBottomWidth: 1, //for IOS
    height: 50,
    marginLeft:10, 
    marginRight:10,
	},
  section: {
    backgroundColor: 'whitesmoke',
    flex: 0.05,
    paddingLeft: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  
  sectionText: {
    color: 'gray'
  },
  });

  const mapStateToProps = state => 
  {
    return {
      selectedPosition: state.fishmarks.selectedPosition
    }
  }

export default connect(mapStateToProps)(WayPointEditScreen);
