import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class Petrol extends React.Component{

  onPress = () => {
    this.props.handleDelete(this.props.item.id);
  }

  render(){
    const {item,status,handleDelete} = this.props;

    let textStyle = function(status){
      if(status){
        return {
          fontSize: 20,
          flex: 1,
          flexDirection: 'row',
          color: 'green'
        };
      }

      return {
        fontSize: 20,
        flex: 1,
        flexDirection: 'row'
      };
    }

      return (
        <View style={styles.item}>
            <Text style={textStyle(status)}>{item.date}</Text>
            <TouchableOpacity onPress={this.onPress} style={styles.touchable}>
                <Image source={require('../icons/remove.png')} />
            </TouchableOpacity>
        </View>

      );
  }
}

const styles = StyleSheet.create({
  item: {
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      marginLeft: 40,
      marginRight: 40,
  },
  touchable: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'red'
  },
});
