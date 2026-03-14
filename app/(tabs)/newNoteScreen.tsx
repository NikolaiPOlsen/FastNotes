import { HomeButton, IconButton } from '@/components/appButton';
import { Colors } from '@/constants/colors';
import { useAuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/utils/supabase';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NewNoteScreen() {
  const [title, setTitle] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const { claims } = useAuthContext();

  const logData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!title.trim()) {
      alert('Did you forget a title?');
      return;
    }
    if (!noteMessage.trim()) {
      alert('Blank note?');
      return;
    }
    try {
      const { error } = await supabase
      .from('Notes')
      .insert({
        note_title: title,
        note_message: noteMessage,
        user_id: user?.id,
        display_name: user?.user_metadata?.display_name,
      })

      if (error) throw error;

      console.log('Note saved!');
      router.push('./homeScreen');
    } 
    catch(error) {
      console.log(error)
    }
  }
    return(
        <SafeAreaView style={styles.boxContainer}>
    <KeyboardAvoidingView
      style={{ flex: 1, width: width * 0.9, marginTop: height * 0.07, }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>

      <TextInput
        placeholder="Title"
        placeholderTextColor={Colors.textLight}
        style={styles.textInputTitle}
        onChangeText={setTitle}
      />

      <TextInput
        multiline={true}
        placeholder="Note"
        placeholderTextColor={Colors.textLight}
        style={styles.textInputNote}
        onChangeText={setNoteMessage}
      />

      <View>
        <IconButton onPress={() => false} icon={<Ionicons name="attach-outline" size={width * 0.07} color={Colors.primary} />}></IconButton>
      </View>


      <View style={styles.formButtonRow}>
        <HomeButton onPress={logData} label={"Create"} ></HomeButton>
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
