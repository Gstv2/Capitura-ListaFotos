import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { CameraType, useCameraPermissions, CameraView } from 'expo-camera';
import uuid from 'react-native-uuid';
import { CameraState, CameraActions, MyPhoto, CameraScreenNavigationProp } from '../model/entities/Myphotos';

export function useCameraViewModel(): CameraState & CameraActions {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [locationGranted, setLocationGranted] = useState(false);
    const [photos, setPhotos] = useState<MyPhoto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // Agora, o useEffect SÓ solicita a permissão de localização (que não tem um hook reativo nativo no mesmo nível)
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationGranted(status === 'granted');
            console.log("Permissão localização:", status === 'granted');
        })();
    }, []);

    // Ação para pedir a permissão de localização (a View chama isso via botão)
    async function requestLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationGranted(status === 'granted');
    }

    // --- Lógica da Câmera ---

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // Ação principal de captura e localização
    async function capturePhoto(navigation: CameraScreenNavigationProp) {
        setLoading(true);

        try {
            // Validações antes de capturar
            if (!cameraRef.current) {
                console.error("Erro: câmera não inicializada");
                return;
            }

            if (!permission?.granted) {
                console.error("Erro: permissão de câmera não concedida");
                return;
            }

            // 1. Tira a foto
            const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
            if (!result?.uri) {
                console.warn("Foto não capturada (URI vazio)");
                return;
            }

            let latitude: number | null = null;
            let longitude: number | null = null;

            // 2. Obtém localização
            try {
                if (locationGranted) {
                    const loc = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced
                    });
                    latitude = loc.coords.latitude;
                    longitude = loc.coords.longitude;
                }
            } catch (locError) {
                console.warn("Falha ao obter localização:", locError);
            }

            // 3. Cria novo objeto MyPhoto
            const newPhoto: MyPhoto = {
                id: uuid.v4().toString(),
                uri: result.uri,
                latitude,
                longitude,
                timestamp: Date.now()
            };

            setPhotos(prev => [newPhoto, ...prev]);

            // 4. Navega para a lista
            navigation.navigate('PhotoList');

        } catch (e) {
            console.error("Erro fatal durante a captura:", e);
            if (e instanceof Error) {
                console.error("Mensagem:", e.message);
                console.error("Stack:", e.stack);
            }

        } finally {
            setLoading(false);
        }
    }

    // Retorna Estado e Ações
    return {
        facing,
        permission,
        cameraRef,
        locationGranted,
        photos,
        loading,
        requestPermission,
        requestLocationPermission,
        toggleCameraFacing,
        capturePhoto
    };
}