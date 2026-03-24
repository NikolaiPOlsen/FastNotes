import { CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function useCameraPermission() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');

    const flipCamera = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return { permission, requestPermission, flipCamera, facing }
}