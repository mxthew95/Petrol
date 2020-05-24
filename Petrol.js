import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Petrol({ item }){
  return (
    <TouchableOpacity>
      <Text style={styles.item}>{item.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 20
  }
});
