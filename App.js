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
      <View style={styles.container}>
        <Text>{hasError}</Text>
        <FlatList style={styles.list}
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
  container:{
    flex: 1,
  },
  listItem:{
    borderRadius: 7,
    padding: 15,
    marginVertical: 10,
    width:'90%',
    backgroundColor: '#d8dbe2',
    alignSelf: 'center',
  },
  list:{
    width: '100%',
    height: '100%',

  },
  errorstyle:{
    flex: 1, 
    padding: 20, 
    justifyContent:'center'
  },
  buttonstyle:{
    alignSelf: 'flex-end',
    width: '22%',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#58a4b0',
    padding: 7,
  }
});

export default App;
