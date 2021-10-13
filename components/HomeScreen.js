import * as React from 'react';
import { View} from 'react-native';
import Store from './StoreScreen';


function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Store></Store>
      </View>
    );
  } 
export default HomeScreen;