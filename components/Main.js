import * as React from 'react';
import { Button, View, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

import Comps from './Screen';
import { out } from 'react-native/Libraries/Animated/src/Easing';

const Drawer = createDrawerNavigator();
// const asd = require("./components/App1")
// console.log(asd);

// return <Drawer.Screen name={array.name} component={array.path} />
// require("./components/App1")

{/* <Drawer.Screen name={asd[i]} component={Comps} /> */}

const applications = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'calc',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'count',
  },
];

export default Main =()=> {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {applications.map(app_name => (
          <Drawer.Screen key ={app_name.id} name={app_name.name} component={Comps} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

