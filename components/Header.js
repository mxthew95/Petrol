import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';

export default function Header(){
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Petrol Dates</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: '#87ceeb'
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'
  }
});
