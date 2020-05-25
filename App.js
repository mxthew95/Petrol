import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import Petrols from './components/Petrols.js';
import Header from './components/Header.js';

export default function App() {
  return (
    <View style={styles.container}>
        <Header/>
      <View style={styles.content}>
        <Petrols/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
});
