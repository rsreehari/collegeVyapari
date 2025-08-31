import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Hello, my Bahrain <Text style={styles.textN}>friend!</Text></Text>
      <Text style={styles.text}>Had your <Text style={styles.textN}>food??</Text></Text>
      <Text style={styles.text}>What's the plan for <Text style={styles.textN}>today?? </Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF', 
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: '#333333',
  },
  textN:{
    color: 'violet',
    fontSize: 22,
    fontWeight: 'bold',
  },
});