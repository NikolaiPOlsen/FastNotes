import { HomeButton } from '@/components/appButton';
import CameraModal from '@/components/cameraModal';
import { PictureMenu } from '@/components/menu';
import { Colors } from '@/constants/colors';
import useUploadMedia from '@/hooks/upload-media';
import useImagePermission from '@/hooks/useImageLibPermission';
import { supabase } from '@/utils/supabase';
import { Ionicons } from "@expo/vector-icons";
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NewNoteScreen() {
  const [title, setTitle] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const { openLibrary, images, addImage, clearImages } = useImagePermission();
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { uploadImage, uploading } = useUploadMedia();


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
      const imageUrl = images.length > 0 ? await uploadImage(images[0]) : null;
      const { error } = await supabase
      .from('Notes')
      .insert({
        note_title: title,
        note_message: noteMessage,
        user_id: user?.id,
        display_name: user?.user_metadata?.display_name,
        image_url: imageUrl
      })

      if (error) throw error;

      setTitle('');
      setNoteMessage('');
      clearImages();
      router.replace('/home');
    }
    catch(error) {
      Alert.alert("Something went wrong");
    }
  }
    return(
      <MenuProvider>
        <SafeAreaView style={styles.boxContainer}>
    <KeyboardAvoidingView
      style={{ flex: 1, width: width * 0.9, marginTop: height * 0.07, }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>

      <TextInput
        placeholder="Title"
        placeholderTextColor={Colors.textLight}
        style={styles.textInputTitle}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        multiline={true}
        placeholder="Note"
        placeholderTextColor={Colors.textLight}
        style={styles.textInputNote}
        value={noteMessage}
        onChangeText={setNoteMessage}
      />

      <View>
      {images.length > 0 && (<FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} 
                 style={{ 
                  width: width * 0.25, 
                  height: undefined,
                  aspectRatio: 4/3,
                  }} 
                resizeMode="contain"
                  />
        )}/>)}
      </View>

      <CameraModal visible={cameraVisible} onClose={() => setCameraVisible(false)} onRetake={() => setCameraVisible(true)} cameraRef={cameraRef} onPhoto={addImage}/>

      <PictureMenu CameraPhoto={() => setCameraVisible(true)} PhotoAlbum={openLibrary}>
        <Ionicons name="attach-outline" size={width * 0.07} color={Colors.primary} />
      </PictureMenu>

      <View style={styles.formButtonRow}>
        {uploading
          ? <ActivityIndicator size="large" color={Colors.primary} />
          : <HomeButton onPress={logData} label={"Create"} disabled={uploading} />}
      </View>

    </KeyboardAvoidingView>
  </SafeAreaView>
</MenuProvider>
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
    justifyContent: 'center',
    alignItems: 'center',
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
