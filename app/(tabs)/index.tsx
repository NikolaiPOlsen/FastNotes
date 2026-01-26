import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function showAlert(message) {
  Alert.alert(message);
}

const app = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [
              styles.newNoteButton,
              {backgroundColor: "#F5B727"}, 
              pressed && styles.pressedButton]}>
              <Text style={styles.buttonText}>{"+"}</Text>
      </Pressable>
      <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisible}
        presentationStyle='formSheet'
      >
      <View style={styles.boxContainer}>
        <View style={styles.formPage}>
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput placeholder="Title" placeholderTextColor={'#CFCFCF'} style={styles.textInput}></TextInput>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
            <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput placeholder="Note" placeholderTextColor={'#CFCFCF'} style={styles.textInput}></TextInput>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.formButtonRow}>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={({ pressed }) => [
              styles.formButtons,
              {backgroundColor: "#F4320B"},
              pressed && styles.pressedButton]}>
            <Text style={styles.smallButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => showAlert('New new created')}
            style={({ pressed }) => [
              styles.formButtons,
              {backgroundColor: "#F5B727"},
              pressed && styles.pressedButton]}>
            <Text style={styles.smallButtonText}>Create</Text>
          </Pressable>
        </View>
      </View>
      </Modal>
      <Text style={styles.descriptiveText}>Notes:</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#212020'
  },
  herotitle: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  newNoteButton: {
    opacity: 100,
    margin: 15,
    borderRadius: 15,
    borderColor: '#F4AE0B',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pressedButton: {
    opacity: 60
  },
  descriptiveText: {
    marginLeft: 15,
    fontSize: 18,
    color: "#DADADA",
  },
    boxContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3C3939',
    alignItems: 'center',
    height: 'auto',
    minHeight: 150,
  },
  formButtonRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
  },
  formButtons: {
    opacity: 100,
    margin: 15,
    borderRadius: 15,
    minWidth: 100,
    minHeight: 25,
  },
    smallButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  textInput: {
    margin: 5,
    minWidth: 225,
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white'
  },
  formPage: {
    marginTop: 15,
    alignItems: 'center'
  }
  
});

export default app