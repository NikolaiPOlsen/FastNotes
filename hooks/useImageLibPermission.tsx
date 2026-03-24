import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const ALLOWED_FORMATS_DISPLAY = 'JPG, JPEG, PNG, GIF, WEBP';
const MAX_SIZE_MB = 15;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

export default function useImagePermission() {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [images, setImages] = useState<string[]>([]);

    const openLibrary = async () => {
    if (!permission?.granted) {
        await requestPermission();
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const ext = uri.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_FORMATS.includes(ext)) {
        Alert.alert(
          'Invalid Format',
          `This file type is not supported. Please use ${ALLOWED_FORMATS_DISPLAY}.`
        );
        return;
      }

      const file = new FileSystem.File(uri);
      const size = file.size;

      if (size !== undefined && size > MAX_SIZE) {
        Alert.alert(
          'File Too Large',
          `The image exceeds the ${MAX_SIZE_MB}MB limit. Please choose a smaller image.`
        );
        return;
      }

      setImages(prev => [...prev, uri]);
      }
    }
    return {
      openLibrary,
      images,
      addImage: (uri: string) => setImages(prev => [...prev, uri]),
      clearImages: () => setImages([]),
    }
}