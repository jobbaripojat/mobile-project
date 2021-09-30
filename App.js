import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Counter from './apps/count/App';
import Calc from './apps/calc/App';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Counter></Counter>
      </View>
      <View style={styles.container}>
        <Calc></Calc>
      </View>
      <View style={styles.container}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});