// NOT USED


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Button, View } from 'react-native';
/* 
var calc = require('./apps/calc/App').default;
var count = require('./apps/count/App').default;
var note = require('./apps/notepad/App').default;

const reqs = [
  {
    name: 'calc',
    req: calc,
  },
  {
    name: 'count',
    req: count,
  },
  {
    name: 'note',
    req: note,
  }
]
*/

var CustomTag;

function CustomRoute(req) {
  CustomTag = req.default;
}

const Comps = (props) => {
  console.log(props);
    CustomRoute(props.route.req);
    return (
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomTag></CustomTag>
      </View>
    );
  } 

export default Comps;