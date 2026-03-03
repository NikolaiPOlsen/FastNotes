import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function authLayout() {
    return (
        <Stack initialRouteName="start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='start' options={{ headerShown: false }}/>
            <Stack.Screen name='login' options={{ headerShown: true, title: 'Login', headerBackTitle: 'Back', headerStyle: { backgroundColor: Colors.background }, headerTintColor: 'black', }}/>
            <Stack.Screen name='register' options={{ headerShown: true, title: 'Register', headerBackTitle: 'Back', headerStyle: { backgroundColor: Colors.background }, headerTintColor: 'black', }}/>
        </Stack>
    )
}