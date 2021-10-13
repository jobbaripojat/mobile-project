import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Button, View } from 'react-native';

//  {props.route.name == 'notepad'? <App1></App1> : null}

import App1 from './App1';
var calc = require('../components/apps/calc/App').default;
var count = require('../components/apps/count/App').default;

const reqs = [
  {
    name: 'calc',
    req: calc,
  },
  {
    name: 'count',
    req: count,
  }
]

var CustomTag = '';

function CustomRoute(name) {
  let x = reqs.find(obj=> {
    return obj.name == name
  })
  CustomTag = x.req;
}

const Comps = (props, { navigation }) => {
    console.log(props.route.name   )
    CustomRoute(props.route.name)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 50 }}>
        <CustomTag></CustomTag>
      </View>
    );
  } 

export default Comps;