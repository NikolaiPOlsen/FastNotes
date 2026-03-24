import { Colors } from '@/constants/colors';
import { useAuthContext } from '@/hooks/use-auth-context';
import AuthProvider from '@/providers/auth-provider';
import * as Notifications from 'expo-notifications';
import { Redirect, Stack } from 'expo-router';
import { MenuProvider } from 'react-native-popup-menu';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
        </Stack>
        <RootNavigation/>
      </MenuProvider>
    </AuthProvider>
  );
}