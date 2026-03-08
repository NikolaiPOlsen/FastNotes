import { Colors } from '@/constants/colors';
import { useAuthContext } from '@/hooks/use-auth-context';
import AuthProvider from '@/providers/auth-provider';
import { Redirect, Stack } from 'expo-router';
import { MenuProvider } from 'react-native-popup-menu';

export function RootNavigation() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Redirect href={"/(auth)/start"}/>;
  }
  if (isLoggedIn) {
    return <Redirect href={"/(tabs)/home"}/>;
  }
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <MenuProvider skipInstanceCheck>
        <Stack>
          <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="screens/editNoteScreen" options={{ headerBackTitle: 'Back', title: 'Edit note', headerStyle: { backgroundColor: Colors.background }, headerTintColor: 'black', }}/>
          <Stack.Screen name="screens/newNoteScreen" options={{ headerBackTitle: 'Back' }}/>
        </Stack>
        <RootNavigation/>
      </MenuProvider>
    </AuthProvider>
  );
}