import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/HomeScreen';
import {} from './components/Reqs';

const applications = [
  {
    id: '1',
    name: 'Calculator',
    req: require('./components/apps/calc/App').default
  },
  {
    id: '2',
    name: 'Counter',
    req: require('./components/apps/count/App').default
  },
  {
    id: '3',
    name: 'Notepad',
    req: require('./components/apps/notepad/App').default
  },
];

const Drawer = createDrawerNavigator();

export default App =()=> {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Store">
        <Drawer.Screen name="Store" component={HomeScreen} />
        {applications.map(app_name => (
          <Drawer.Screen key={app_name.id} name={app_name.name} component={app_name.req} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}