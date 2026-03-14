import { Colors } from '@/constants/colors';
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    onPress: () => void;
    label: string;
    icon?: React.ReactNode;
}

type PropsIconButton = {
    onPress: () => void;
    icon?: React.ReactNode;
}

export function AppButton({ onPress, label, icon }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.appButton,
                {backgroundColor: Colors.primary},
                pressed && {opacity: '0.6'}
            ]}>
            <Text style={styles.buttonText}>{label}</Text>
            {icon}
        </Pressable>
    )
}

export function HomeButton({ onPress, label, icon }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.homeButton,
                {backgroundColor: Colors.primary},
                pressed && {opacity: '0.6'}
            ]}>
            <Text style={styles.buttonText}>{label}</Text>
            {icon}
        </Pressable>
    )
}

export function IconButton({ onPress, icon }: PropsIconButton) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.iconButton,
                pressed && {opacity: '0.6'}
            ]}>
            <Text style={styles.buttonText}></Text>
            {icon}
        </Pressable>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    appButton: {
        marginTop: 5,
        height: height * 0.07,
        width: width * 0.6,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    homeButton: {
        marginTop: 5,
        height: height * 0.07,
        width: width * 0.9,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconButton: {
        width: width * 0.1,
        flexDirection: 'row',
        marginBottom: 5,
    }
});