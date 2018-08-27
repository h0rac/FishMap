import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const EditedItem = (props) =>  {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.generalContainer} onPress={()=> props.onEdit(props.selectedPosition.title)}>
        <View style={styles.generalText}>
          <Text style={styles.enableText}>Name:</Text>
          <Text style={styles.textData}>{props.selectedPosition.title}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generalContainer}  onPress={()=> props.onEdit(props.selectedPosition.fishType)}>
        <View style={styles.generalText}>
          <Text style={styles.enableText}>Fish type:</Text>
          <Text style={styles.textData}>{props.selectedPosition.fishType}</Text>
        </View>
        </TouchableOpacity>
        </View>
    )
        
  }
  EditedItem.propTypes = {
      selectedPosition: PropTypes.object,
      onEdit: PropTypes.func
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'whitesmoke',
      flexDirection: 'column'
    },
    
    generalContainer: {
      flex: 0.1,
      flexDirection: 'row',
      backgroundColor: 'mintcream',
      alignItems: 'center',
      height: 70,
      marginBottom:2
    },
    
    itemContainer: {
      flex: 0.1,
      flexDirection: 'row',
      backgroundColor: 'mintcream',
      alignItems: 'center',
      paddingBottom: 5,
      paddingTop: 5
    },
    
    section: {
      backgroundColor: 'whitesmoke',
      flex: 0.05,
      paddingLeft: 10,
      paddingTop: 30,
      flexDirection: 'row',
      alignItems: 'center'
    },
    
    enableSwitch: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    
    sectionText: {
      color: 'gray'
    },
    
    generalText: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 10
    },
    
    enableText: {
      paddingTop: 5,
      display:'flex',
      flex:1
    },
  
    textData: {
      paddingTop: 5,
      display:'flex',
      flex:4
    },
    
    title: {
      backgroundColor: 'black',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center'
      }
    });
