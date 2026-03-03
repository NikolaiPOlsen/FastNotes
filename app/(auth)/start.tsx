import { AppButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.herotitle}>FastNotes</Text>
            <Text style={styles.subherotitle}>Your easy to use notes app</Text>

            <View style={ styles.space}>
                <AppButton onPress={() => router.push("/(auth)/login")} label="Login" icon={<MaterialIcons name="person" size={width * 0.07} color={Colors.white}/>}/>
            </View>
            <View style={ styles.space}>
                <AppButton onPress={() => router.push("/(auth)/register")} label="Create Account" icon={<MaterialIcons name="person" size={width * 0.07} color={Colors.white}/>}/>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    herotitle: {
        fontSize: width * 0.12,
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