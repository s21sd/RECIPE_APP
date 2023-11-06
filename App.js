import Home from './src/Screen/Home';
import { View, Text, Image } from 'react-native'
import Welcome from './src/Screen/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Welcome' component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

