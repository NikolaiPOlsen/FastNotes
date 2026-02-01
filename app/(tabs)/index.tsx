import { HomeScreen } from '@/components/homeScreen';
import { NewNoteScreen } from "@/components/newNoteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const app = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="New Note" component={NewNoteScreen}/>
      </Stack.Navigator>
  )
}

export default app