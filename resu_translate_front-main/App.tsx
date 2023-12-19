import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Login } from './src/Login/Login';
import { MyTabs } from './src/Navegation/Tabs';
import ConsumerProvider, { AppContext } from './src/Context/AppContext';


function App(): JSX.Element {
  return (
    <ConsumerProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ConsumerProvider>
  );
}


export default App;
