import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export function NewNoteScreen( {navigation} ) {
  const [title, setTitle] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  const logData = async () => {
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
        style={{width: "90%"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput placeholder="Title" placeholderTextColor={'#CFCFCF'} style={styles.textInputTitle} onChangeText={setTitle}></TextInput>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

            <KeyboardAvoidingView
            style={{width: "90%", height: '90%'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput placeholder="Note" placeholderTextColor={'#CFCFCF'} style={styles.textInputNote} onChangeText={setNoteMessage}></TextInput>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

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
    margin: 15,
    opacity: 100,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  smallButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },
  textInputTitle: {
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1, 
  },
  textInputNote: {
    fontSize: 18,
    marginTop: 15,
    height: '90%',
  },
    pressedButton: {
    opacity: 60
  },
});
