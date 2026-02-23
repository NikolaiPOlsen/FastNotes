import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen( {navigation} ) {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
);

  //const clearStorage = async () => {
    //await AsyncStorage.clear();
    //setNotes([]);
  //}

  const getData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch(error) {
      console.log(error);
    }
  };
  const handleOnPress = (item) => {
    setSelectedNote(item);
    setModalVisible(true);
  }
  const renderedNote = ({ item }) => {
    return (
    <TouchableOpacity onPress={() => handleOnPress(item)} activeOpacity={0.7}>
        <View style={{ paddingLeft: 10, margin: 10, backgroundColor: '#f0f0f0' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14, marginTop: 5 }}>{item.noteMessage}</Text>
        </View>
    </TouchableOpacity>
    );
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Text style={styles.descriptiveText}>Notes:</Text>

      <FlatList style={{ height: '90%' }} data={notes} renderItem={renderedNote} keyExtractor={(item) => item.id.toString()}/>

    <View style={styles.pageSpace}>
      <Pressable
        onPress={() => navigation.navigate("New Note")}
        style={({ pressed }) => [
          styles.newNoteButton,
          {backgroundColor: "#735530"},
          pressed && styles.pressedButton]}>
          <Text style={styles.buttonText}>{"New note"}</Text>
          <MaterialIcons name="article" size={22} color="white"/>
      </Pressable>
    </View>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalView}>
          <Text>Title: {selectedNote?.title}</Text>
          <Text>Message: {selectedNote?.noteMessage}</Text>
          <Pressable
              onPress={() => setModalVisible(false)} 
              style={({ pressed }) => [
                styles.newNoteButton,
                {backgroundColor: "#735530"}, 
                pressed && styles.pressedButton]}>
                    <Text style={styles.buttonText}>{"back"}</Text>
                    <MaterialIcons name="home" size={22} color="white"/>
        </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  herotitle: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  descriptiveText: {
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 18,
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pressedButton: {
    opacity: 60
  },
  newNoteButton: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    borderColor: '#735530',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pageSpace: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});