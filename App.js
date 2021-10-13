/* import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; */
import { FileSystem } from 'react-native-unimodules';
import { FetchAppNames, Init, Drop } from './components/db';

var INSTALLED_APPS = [];
var DOWNLOADED_APPS = [];
var APP_REQUIREMENTS = [];
var WAIT_TIME = 1;

console.log("\nApp started\n-----------");

function GetReqs(){
  Main();
  setTimeout(() => {
    console.log(APP_REQUIREMENTS);
    return APP_REQUIREMENTS;
  }, WAIT_TIME);
  Reset(); 
}

function Reset(){
  INSTALLED_APPS = [];
  DOWNLOADED_APPS = [];
  APP_REQUIREMENTS = [];
}

async function Main(){
  Init().then(()=>{console.log('Database creation succeeded!');}).catch((err)=>{console.log('Database IS NOT initialized! ' + err);});
  CheckApps();
  GetAllApps();
}

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
    DlApp(ELEMENT);
    console.log(ELEMENT + ' downloaded!');
    DOWNLOADED_APPS.push(ELEMENT);
  });

  DOWNLOADED_APPS.forEach(ELEMENT => {
    var X = CreateReqs(ELEMENT)
      APP_REQUIREMENTS.push(X);
  });
}

function ClearApps(){
  const PATH = FileSystem.documentDirectory + 'apps';
  FileSystem.deleteAsync(PATH);
  FileSystem.makeDirectoryAsync(PATH);
  console.log("Apps deleted!");
}

function CheckApps(){
  const PATH = FileSystem.documentDirectory + 'apps';
  let DIR = FileSystem.readDirectoryAsync(PATH)

  if (DIR.length > 0) {
    DIR.forEach(ELEMENT => {
      const OBJ = {
        name: ELEMENT,
        path: PATH + '/' + ELEMENT
      }
      DOWNLOADED_APPS.push(OBJ);
    });
  }
}

function CreateReqs(APP_NAME) {
  const PATH = FileSystem.documentDirectory + 'apps/' + APP_NAME;
  // do not work
  // const REQ = await import(PATH);
  // const REQ = Function('return require("' + PATH + '").default;');
  // const REQ = require(""+PATH).default;
  // const REQ = require(`${PATH}`).default;
  const OBJ = {
    name: APP_NAME,
    req: PATH
  }
  return OBJ;
}

async function DlApp(APP_NAME){
  const PATH = FileSystem.documentDirectory + 'apps/' + APP_NAME;
  const INFO = await FileSystem.getInfoAsync(PATH);
  if (!INFO.exists) {
    await FileSystem.makeDirectoryAsync(PATH, { intermediates: true });
    const REMOTE_URI = 'https://storage.googleapis.com/awis-apps/' + APP_NAME;
    const { uri: LOCAL_PATH } = await FileSystem.downloadAsync(REMOTE_URI, PATH);
  }
}

/* const App = () => {
  return (
    <View style={STYLES.container}>
      <TouchableOpacity onPress={GetReqs}><Text>aaaaaa</Text></TouchableOpacity>
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

export default App;  */