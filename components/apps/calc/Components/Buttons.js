import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const Buttons = (props) => {

    return (
        <View style={styles.buttonArea}>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 7)}><Text>7</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 4)}><Text>4</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 1)}><Text>1</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('reset', null)}><Text>C</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 8)}><Text>8</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 5)}><Text>5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 2)}><Text>2</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 0)}><Text>0</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 9)}><Text>9</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 6)}><Text>6</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('number', 3)}><Text>3</Text></TouchableOpacity>
              <TouchableOpacity style={{width: 80, height: 80}}></TouchableOpacity>
            </View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('operator', '+')}><Text>+</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('operator', '-')}><Text>-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('operator', '/')}><Text>/</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('operator', '*')}><Text>*</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.onButtonData('operator', '=')}><Text>=</Text></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonArea: {
      flex: 4,
      flexDirection: 'row',
      width: '102%',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: 'black',
    },
    buttonColumn: {
      flex: 1,
      width: '20%',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '10%',
      height: '10%'
    }
});

export default Buttons;