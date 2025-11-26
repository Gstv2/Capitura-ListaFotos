import { CameraType, PermissionResponse, CameraView } from 'expo-camera';
import { RefObject } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// --- Entidade de Dados (Model) ---
export type MyPhoto = {
  id: string; // Adicionado id para uso no FlatList e navegação
  uri: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: number; 
}

// --- Definição das Rotas para Tipagem Segura ---
export type RootStackParamList = {
  Camera: undefined;
  PhotoList: undefined;
  // PhotoDetail: { photoId: string }; // Desafio Extra
};

// Estado (o que a View consome)
export type CameraState = {
  facing: CameraType;
  permission: PermissionResponse | null;
  cameraRef: RefObject<CameraView>;
  locationGranted: boolean;
  photos: MyPhoto[];
  loading: boolean;
}

// Ações (o que a View dispara)
export type CameraActions = {
  requestPermission: () => void;
  requestLocationPermission: () => Promise<void>;
  toggleCameraFacing: () => void;
  capturePhoto: (navigation: CameraScreenNavigationProp) => Promise<void>;
}

// Tipagem de Navegação
export type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;