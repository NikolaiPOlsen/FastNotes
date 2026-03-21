import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const ALLOWED_FORMATS_DISPLAY = 'JPG, JPEG, PNG, GIF, WEBP';
const MAX_SIZE_MB = 15;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

export default function useImagePermission() {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [images, setImages] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<{ title: string; message: string } | null>(null);

    useEffect(() => {
        if (alertMessage) {
            Alert.alert(alertMessage.title, alertMessage.message);
            setAlertMessage(null);
        }
    }, [alertMessage]);

    const openLibrary = async () => {
        if (!permission?.granted) {
            await requestPermission();
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const uri = asset.uri;

            const ext = uri.split('.').pop()?.toLowerCase() ?? '';
            if (!ALLOWED_FORMATS.includes(ext)) {
                setAlertMessage({ title: 'Invalid Format', message: `This file type is not supported. Please use ${ALLOWED_FORMATS_DISPLAY}.` });
                return;
            }

            const fileInfo = await FileSystem.getInfoAsync(uri);
            const size = asset.fileSize ?? (fileInfo as any).size;
            if (size !== undefined && size > MAX_SIZE) {
                setAlertMessage({ title: 'File Too Large', message: `The image exceeds the ${MAX_SIZE_MB}MB limit. Please choose a smaller image.` });
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
