import { HomeButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { getData } from '@/utils/noteUtils';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DiscoverScreen() {
      const [notes, setNotes] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [selectedNote, setSelectedNote] = useState(null);
      const [refreshing, setRefreshing] = useState(false);

        const fetchNotes = async () => {
          const data = await getData(false);
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
                <Text style={{ fontSize: width * 0.04, marginTop: 5 }}>{item.display_name}</Text>
              </View>
          </TouchableOpacity>
          );
        }

return (

<SafeAreaView style={styles.container}>
    <View style={styles.centerHeader}>
        <Text style={styles.descriptiveText}>Discover notes</Text>
    </View>

      <FlatList style={{ flex: 1 }} data={notes} renderItem={renderedNote} keyExtractor={(item) => item.id.toString()} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>

    <View style={styles.pageSpace}>
    </View>
      <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={[styles.modalView, { paddingTop: height * 0.05,  paddingBottom: height * 0.05}]}>
          <Text style={styles.textDisplayTitle}>Title: {selectedNote?.note_title}</Text>
          <Text style={styles.textDisplayNote}>Message: {selectedNote?.note_message}</Text>
          <HomeButton onPress={() => setModalVisible(false)} label={"Back"} ></HomeButton>
          </View>
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
      descriptiveText: {
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: width * 0.05,
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
      centerHeader: {
        alignItems: 'center',
        borderBottomWidth: 1,
      }
      
    });