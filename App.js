import React, { useState, useEffect } from "react";
import {View, Text, FlatList, StyleSheet, Alert, ActivityIndicator} from 'react-native';

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
  //This is called every time the view is rendered
  //The new calls of fetchData (and others) must be stopped somehow, because in
  //those methods are statevariables set, which cause a new re-render.
  useEffect(() => {
      if (isLoading==true){
      setLoading(false);
       fetchFish2();
    }
  });
  //If the 'fetch' is not ready yet, an activityindicator is shown
  if (isLoading==true) {
    return (
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  //If errors
  else if(hasError){
    return(
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <Text>{hasError}</Text>
        <Text>{""+someError}</Text>
      </View>
    );
  }
  //Otherwise the list is shown
  else{
    return (
      <View style={{marginTop:50}}>
        <Text>{hasError}</Text>
        <FlatList
            data={apps}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                {/* <Text>{item.id}) {item.title}, {item.releaseYear}</Text> */}
                <Text>{item.id}) {item.name}</Text>
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
    backgroundColor: '#fce',    
  }
});

export default App;
