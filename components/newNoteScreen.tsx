import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export function NewNoteScreen( {navigation} ) {
  const [title, setTitle] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  const logData = async () => {
    if (!title.trim()) {
      alert('Did you forget a title?');
      return;
    }
    if (!noteMessage.trim()) {
      alert('Blank note?');
      return;
    }
    try {
      const existingNotes = await AsyncStorage.getItem('notes');
      const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

      const newNote = {
        id: Date.now(),
        title: title,
        noteMessage: noteMessage,
      };

      notesArray.push(newNote);

      await AsyncStorage.setItem('notes', JSON.stringify(notesArray));

      console.log('Note saved!');
      {navigation.popTo('Home')};
    } 
    catch(error) {
      console.log(error)
    }
  }
    return(
        <SafeAreaView style={styles.boxContainer}>
    <KeyboardAvoidingView
      style={{ flex: 1, width: '90%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>

      <TextInput
        placeholder="Title"
        placeholderTextColor={'#CFCFCF'}
        style={styles.textInputTitle}
        onChangeText={setTitle}
      />

      <TextInput
        multiline={true}
        placeholder="Note"
        placeholderTextColor={'#CFCFCF'}
        style={styles.textInputNote}
        onChangeText={setNoteMessage}
      />

      <View style={styles.formButtonRow}>
        <Pressable
          onPress={logData}
          style={({ pressed }) => [
            styles.formButtons,
            {backgroundColor: "#735530"},
            pressed && styles.pressedButton]}>
          <Text style={styles.smallButtonText}>Create</Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>
  </SafeAreaView>
)
}
const styles = StyleSheet.create({
  boxContainer: {
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
    height: 40,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  smallButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  textInputTitle: {
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1, 
  },
  textInputNote: {
    fontSize: 18,
    marginTop: 15,
    flex: 1,
  },
    pressedButton: {
    opacity: 60
  },
});
