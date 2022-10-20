import React, { useState } from "react";

//react navigation Stack
import RootStack from "./navigators/RootStack";


//apploading
//import * as SplashScreen from 'expo-splash-screen';
 

export default function App() {
  /* 
  const [appReady, setAppReady ] = useState(false);

  if(!appReady) {
    return (
      SplashScreen.hideAsync()
    )
  } */

  

  return <RootStack />;
}
