import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const CalcField = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.textFieldStart}>
                <Text style={{fontSize: 36}}>{props.inputText}</Text>
            </View>
            <View style={styles.textFieldEnd}>
                <Text style={{fontSize: 48}}>{props.outputText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '100%'
    },
    textFieldStart: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      paddingLeft: 30,
      paddingTop: 5
    },
    textFieldEnd: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      paddingRight: 30,
      paddingBottom: 5,
      alignItems: 'flex-end'
    },
});
export default CalcField;