import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <View style={{ paddingLeft: 10, margin: 10 }}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: width * 0.04, marginTop: 5 }}>{item.noteMessage}</Text>
        </View>
    </TouchableOpacity>
    );
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Text style={styles.descriptiveText}>Notes:</Text>

      <FlatList style={{ height: 'height * 0.9' }} data={notes} renderItem={renderedNote} keyExtractor={(item) => item.id.toString()}/>

    <View style={styles.pageSpace}>
      <Pressable
        onPress={() => navigation.navigate("New Note")}
        style={({ pressed }) => [
          styles.newNoteButton,
          {backgroundColor: "#735530"},
          pressed && styles.pressedButton]}>
          <Text style={styles.buttonText}>{"New note"}</Text>
          <MaterialIcons name="article" size={width * 0.07} color="white"/>
      </Pressable>
    </View>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalView}>
          <Text style={styles.textDisplayTitle} >Title: {selectedNote?.title}</Text>
          <Text style={styles.textDisplayNote}>Message: {selectedNote?.noteMessage}</Text>
          <Pressable
              onPress={() => setModalVisible(false)} 
              style={({ pressed }) => [
                styles.newNoteButton,
                {backgroundColor: "#735530"}, 
                pressed && styles.pressedButton]}>
                    <Text style={styles.buttonText}>{"Back"}</Text>
                    <MaterialIcons name="home" size={width * 0.07} color="white"/>
        </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  herotitle: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    fontSize: width * 0.04,
    textAlign: 'center'
  },
  descriptiveText: {
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: width * 0.05,
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  pressedButton: {
    opacity: 60
  },
  newNoteButton: {
    height: height * 0.06,
    width: width * 0.9,
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
  },
  textDisplayTitle: {
    marginTop: height * 0.005,
    fontSize: width * 0.06,
    fontWeight: "bold", 
  },
  textDisplayNote: {
    fontSize: width * 0.05,
    marginTop: height * 0.001,
    flex: 1,
  }
  
});