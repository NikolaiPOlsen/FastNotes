import { AppButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { supabase } from '@/utils/supabase';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUp() {
        setLoading(true);
        if (password == repassword){
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) Alert.alert(error.message);
        setLoading(false);
        }
        else {
            Alert.alert('Password does not match')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ alignItems: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <Text style={styles.headerText}>Register account</Text>
                <TextInput style={styles.textInputBox} placeholder={"Email"} onChangeText={setEmail}></TextInput>
                <TextInput style={styles.textInputBox} placeholder={"Password"} onChangeText={setPassword} secureTextEntry={true}></TextInput>
                <TextInput style={styles.textInputBox} placeholder={"Re-enter password"} onChangeText={setRePassword} secureTextEntry={true}></TextInput>
                <AppButton onPress={signUp} label="Register account" icon={<MaterialIcons name="person" size={width * 0.07} color={Colors.white}/>}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create ({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
        headerText: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
    },
        textInputBox: {
        borderColor: Colors.border,
        width: width * 0.6,
        height: height * 0.05,
        borderWidth: 1,
        margin: height * 0.005,
        padding: 15,
    },
})