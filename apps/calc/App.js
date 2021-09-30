import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import CalcButtons from './Components/Buttons';
import CalcField from './Components/InputField';

var inputted = '';
var numberSet1 = '';
var numberSet2 = '';
var first = true;
var done = false;
var operator = '';
var math = {
  '+': function (x, y) {return x + y},
  '-': function (x, y) {return x - y},
  '/': function (x, y) {return x / y},
  '*': function (x, y) {return x * y},
}

const Calc = () => {

  const [inputText, setText] = useState('');
  const [outputText, outText] = useState('');

  const handleButton = (type, value) => {

    if (value == null){
      inputted = '';
      numberSet1 = '';
      numberSet2 = '';
      first = true;
      done = false;
      operator = '';
      outText('');
      setText(inputted);
      return;
    }

    if (!done) {
      inputted = inputted + value;
    }
    
    if (value == '=') {
      outText(math[operator](parseInt(numberSet1), parseInt(numberSet2)));
      done = true;
      setText(inputted);
      return;
    }
    
    if (type == 'operator') {
      operator = value;
      first = false;
    } else if (first){
      numberSet1 = numberSet1 + value;
    } else {
      numberSet2 = numberSet2 + value;
    }
    
    setText(inputted);
  };

  return (
    <View style={styles.container}>
      <CalcField inputText={inputText} outputText={outputText}></CalcField>
      <CalcButtons onButtonData={handleButton}></CalcButtons>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default Calc;