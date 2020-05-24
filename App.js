import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import Petrols from './Petrols.js';
import Header from './Header.js';

export default function App() {
  return (
    <View>
      <Header/>
      <View style={styles.content}>
        <Petrols/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 20,
    marginRight: 20
  }
});
