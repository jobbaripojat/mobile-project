import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FileSystem } from 'react-native-unimodules';
import { FetchAppNames, Init, addFish, Drop } from './components/db';

var INSTALLED_APPS = [];
var DOWNLOADED_APPS = [];
var APP_REQUIREMENTS = [];

Init().then(()=>{console.log('Database creation succeeded!');}).catch((err)=>{console.log('Database IS NOT initialized! ' + err);});

ClearApps();
CheckApps();

GetAllApps();

async function GetAllApps(){
  try{
    const DB_RESULT = await FetchAppNames();
    const RESULT_ARRAY = DB_RESULT.rows._array;
    RESULT_ARRAY.forEach(ELEMENT => {
      INSTALLED_APPS.push(ELEMENT.name);
    });
  }
  catch(ERR){
    console.log(ERR);
  }
  INSTALLED_APPS.forEach(ELEMENT => {
    if (DOWNLOADED_APPS.findIndex(x => x.name == ELEMENT) == -1) {
      DlApp(ELEMENT);
    }
  });
  DOWNLOADED_APPS.forEach(ELEMENT => {
    CreateReqs(ELEMENT.name, ELEMENT.path);
  })
  console.log(APP_REQUIREMENTS);
}

function CreateReqs(APP_NAME, PATH) {
  const STRING = 'require("' + PATH + '");';
  const FUNC = new Function(STRING);
  const OBJ = {
    name: APP_NAME,
    func: FUNC
  }
  APP_REQUIREMENTS.push(OBJ);
  console.log(APP_NAME + ' require added');
}

async function DlApp(APP_NAME){
  const PATH = FileSystem.documentDirectory + 'apps/' + APP_NAME;
  await FileSystem.makeDirectoryAsync(PATH, { intermediates: true });
  const REMOTE_URI = 'https://storage.googleapis.com/awis-apps/' + APP_NAME;
  const { uri: LOCAL_PATH } = await FileSystem.downloadAsync(REMOTE_URI, PATH);
  const OBJ = {
    name: APP_NAME,
    path: LOCAL_PATH
  }
  console.log(APP_NAME + " downloaded!");
  DOWNLOADED_APPS.push(OBJ);
}

async function ClearApps(){
  const PATH = FileSystem.documentDirectory + 'apps';
  await FileSystem.deleteAsync(PATH);
  await FileSystem.makeDirectoryAsync(PATH);
  return console.log("Apps deleted!");
}

async function CheckApps(){
  const PATH = FileSystem.documentDirectory + 'apps';
  let DIR = await FileSystem.readDirectoryAsync(PATH)
  .then(DIR => {
    if (DIR.length > 0) {
      DIR.forEach(ELEMENT => {
        DOWNLOADED_APPS.push(ELEMENT);
      });
    }
  })
  .catch((err)=>{
    console.log('Database IS NOT initialized! '+err);
  });
}

const App = () => {
  return (
    <View style={STYLES.container}>
      <TouchableOpacity><Text>aaaaaaaaa</Text></TouchableOpacity>
    </View>
  );
}

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;