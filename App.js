import React, { useState, useEffect } from "react";
import {View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { InstallApp, Init, FetchAppNames, Drop } from "./components/db";

Init().then(()=>{console.log('Database creation succeeded!');}).catch((err)=>{console.log('Database IS NOT initialized! ' + err);});


const App = () => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [apps, setApps] = useState([]);
  const [isLoading, setLoading]=useState(true);

  //Another function with different code - e.g. logging and catching errors
  async function fetchFish2(){
    await fetch("https://awis-327608.appspot.com/rest/MobileServices/getAll")
    .then(parameter=>parameter.json()
          .catch(err=>{setSomeErrors(err);setErrors(true);console.log("JSON Error: "+err)})
    .then(anotherParameter=>{setApps(anotherParameter);console.log(anotherParameter)})
    .catch(anError=>{setSomeErrors(anError);console.log(anError)}));
  }
  useEffect(() => {
      if (isLoading==true){
      setLoading(false);
       fetchFish2();
    }
  });
  if (isLoading==true) {
    return (
      <View style={styles.errorstyle}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  //If errors
  else if(hasError){
    return(
      <View style={styles.errorstyle}>
        <Text>{hasError}</Text>
        <Text>{""+someError}</Text>
      </View>
    );
  }

  else{
    return (
      <View style={styles.list}>
        <Text>{hasError}</Text>
        <FlatList
            data={apps}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Text>{item.id}) {item.name}</Text>
                <TouchableOpacity style={styles.buttonstyle} onPress ={() => InstallApp(item.id, item.name)}><Text>Install</Text></TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
};
const styles=StyleSheet.create({
  listItem:{
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#0f0',
    backgroundColor: '#778899',
  },
  list:{
    marginTop:'50%',
    alignItems:'center',

  },
  errorstyle:{
    flex: 1, 
    padding: 20, 
    justifyContent:'center'
  },
  buttonstyle:{
    borderColor: 'black',
    borderWidth: 2,
    alignItems:'center',
  }
});

export default App;
