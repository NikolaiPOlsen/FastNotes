import { HomeButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { editNote } from '@/utils/noteUtils';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditNoteScreen() {
    const params = useLocalSearchParams();
    const note = JSON.parse(params.note as string);
    const [newTitle, setNewTitle] = useState(note.note_title);
    const [newMessage, setNewMessage] = useState(note.note_message);

    const logData = async () => {
        if (!newTitle.trim()) {
            alert('Did you forget a title?');
        return;
        }
        if (!newMessage.trim()) {
            alert('Blank note?');
        return;
        }
        await editNote(note.id, newTitle, newMessage, () => {
        router.back();
    });
}

    return(
    <SafeAreaView style={styles.boxContainer}>
        <KeyboardAvoidingView
        style={{ flex: 1, width: width * 0.9 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>

        <TextInput
            value={newTitle}
            placeholderTextColor={Colors.textLight}
            style={styles.textInputTitle}
            onChangeText={setNewTitle}
        />

      <TextInput
        multiline={true}
        value={newMessage}
        placeholderTextColor={Colors.textLight}
        style={styles.textInputNote}
        onChangeText={setNewMessage}
      />

      <View style={styles.formButtonRow}>
        <HomeButton onPress={logData} label={"Update"} ></HomeButton>
      </View>

    </KeyboardAvoidingView>
  </SafeAreaView>
)
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  formButtonRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  formButtons: {
    opacity: 100,
    borderRadius: 15,
    height: height * 0.06,
    width: width * 0.9,
    justifyContent: 'center',
    marginBottom: 15,
  },
  smallButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: width * 0.06,
    textAlign: 'center',
  },
  textInputTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1, 
  },
  textInputNote: {
    fontSize: width * 0.04,
    marginTop: height * 0.001,
    flex: 1,
  },
    pressedButton: {
    opacity: 60
  },
});
