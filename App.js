import Home from './src/Screen/Home';
import Welcome from './src/Screen/Welcome';
import RecipeDetails from './src/Screen/RecipeDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='RecipeDetails' component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

