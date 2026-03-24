import { supabase } from '@/utils/supabase';
import * as FileSystem from 'expo-file-system/legacy';
import { useState } from 'react';
import { Alert } from 'react-native';

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
const ALLOWED_FORMATS_DISPLAY = 'JPG, JPEG, PNG, WEBP';
const MAX_SIZE_MB = 15;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

export default function useUploadMedia() {
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (uri: string): Promise<string | null> => {
        setUploading(true);
        try {
            const ext = uri.split('.').pop()?.toLowerCase() ?? '';

            if (!ALLOWED_FORMATS.includes(ext)) {
                Alert.alert(
                    'Invalid Format',
                    `This file type (.${ext}) is not supported. Please use ${ALLOWED_FORMATS_DISPLAY}.`
                );
                return null;
            }

            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (fileInfo.exists && fileInfo.size !== undefined && fileInfo.size > MAX_SIZE) {
                Alert.alert(
                    'File Too Large',
                    `The image exceeds the ${MAX_SIZE_MB}MB limit. Please choose a smaller image.`
                );
                return null;
            }

            const fileName = `${Date.now()}.${ext}`;

            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }

            const { data, error } = await supabase.storage
                .from('Note_pictures')
                .upload(fileName, bytes, { contentType: `image/${ext}` });

            if (error) {
                Alert.alert('Upload Failed', `Could not upload image: ${error.message}`);
                return null;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('Note_pictures')
                .getPublicUrl(data.path);

            return publicUrl;
        } catch (err: any) {
            Alert.alert('Upload Error', err?.message ?? 'An unexpected error occurred while uploading the image.');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const uploadImages = async (uris: string[]): Promise<string[]> => {
        setUploading(true);
        const urls = await Promise.all(uris.map(uploadImage));
        setUploading(false);
        return urls.filter(Boolean) as string[];
    };

    return { uploadImage, uploading };
}
