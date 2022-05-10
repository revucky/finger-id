import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Login from './src/login';
import Home from './src/home';

const loadFont = async () => {
  await Font.loadAsync({
    'Federo-Regular': require('./assets/Federo-Regular.ttf'),
    // 'Tapa-Regular': require('./assets/fonts/Tapestry-Regular.ttf'),
  });
};

const App = (): JSX.Element => {
   const [isReady, setIsReady] = useState(false);



    if (!isReady) {
      return (
        <AppLoading
          startAsync={loadFont}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      ); 
    };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default App;


