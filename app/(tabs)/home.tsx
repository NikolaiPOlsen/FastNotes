import { HomeButton } from '@/components/appButton';
import { NoteMenu } from '@/components/menu';
import { Colors } from '@/constants/colors';
import { getData } from '@/utils/noteUtils';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotes = async () => {
    const data = await getData();
    setNotes(data);
}

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotes();
    setRefreshing(false);
})

  useFocusEffect(
    React.useCallback(() => {
        fetchNotes();
    }, [])
);

  const handleOnPress = (item) => {
    setSelectedNote(item);
    setModalVisible(true);
  }

  const renderedNote = ({ item }) => {
    return (
    <TouchableOpacity onPress={() => handleOnPress(item)} activeOpacity={0.6}>
        <View style={{ paddingLeft: 10, margin: 10 }}>
          <Text style={{ fontSize: width * 0.05, fontWeight: 'bold' }}>{item.note_title}</Text>
          <Text style={{ fontSize: width * 0.04, marginTop: 5 }} numberOfLines={1}>{item.note_message}</Text>
          <Text style={{ fontSize: width * 0.04, marginTop: 5 }}>{item.created_at}</Text>

        </View>
    </TouchableOpacity>
    );
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Text style={styles.descriptiveText}>Notes:</Text>

      <FlatList style={{ flex: 1 }} data={notes} renderItem={renderedNote} keyExtractor={(item) => item.id.toString()} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>

    <View style={styles.pageSpace}>
    </View>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <MenuProvider>
        <View style={[styles.modalView, { paddingTop: height * 0.05,  paddingBottom: height * 0.05}]}>
          <NoteMenu note={selectedNote} onEdit={() => { setModalVisible(false); router.push({ pathname: "/screens/editNoteScreen", params: { note: JSON.stringify(selectedNote) } }); }} onDelete={() => { setModalVisible(false); fetchNotes(); }}>
            <MaterialIcons name='menu' size={35}/>
          </NoteMenu>
          <Text style={styles.textDisplayTitle}>Title: {selectedNote?.note_title}</Text>
          <Text style={styles.textDisplayNote}>Message: {selectedNote?.note_message}</Text>
          <HomeButton onPress={() => setModalVisible(false)} label={"Back"} ></HomeButton>
        </View>
        </MenuProvider>
      </Modal>
    </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
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
    color: Colors.white,
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
    borderColor: Colors.primary,
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
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textDisplayTitle: {
    marginTop: height * 0.01,
    fontSize: width * 0.06,
    fontWeight: "bold", 
    width: width * 0.9,
  },
  textDisplayNote: {
    fontSize: width * 0.05,
    marginTop: height * 0.001,
    flex: 1,
    width: width * 0.9,
  },
  userProfile: {
    marginLeft: width * 0.05,
    marginTop: height * 0.01,
  }
  
});