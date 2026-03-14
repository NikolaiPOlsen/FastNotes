import { AppButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Ionicons name='cafe' size={width * 0.15} color={Colors.primary}/> 
            <Text style={styles.herotitle}>Coffee Notes</Text>
            <Text style={styles.subherotitle}>Your easy to use notes app</Text>

            <View style={ styles.space}>
                <AppButton onPress={() => router.push("/(auth)/login")} label="Login"/>
            </View>
            <View style={ styles.space}>
                <AppButton onPress={() => router.push("/(auth)/register")} label="Create Account"/>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    herotitle: {
        fontSize: width * 0.10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subherotitle: {
        fontSize: width * 0.05,
        textAlign: 'center'
    },
    space: {
        marginTop: height * 0.01,
    }

})