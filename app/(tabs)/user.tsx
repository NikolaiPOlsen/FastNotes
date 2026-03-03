import { AppButton } from '@/components/appButton';
import { SignOut } from '@/components/logOut';
import { Colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen( {navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <AppButton onPress={SignOut} label={"Logout"}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
    }
})