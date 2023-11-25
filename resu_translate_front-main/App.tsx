
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MyTabs } from './src/Navegation/Tabs';



function App(): JSX.Element {

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


export default App;
