import { CameraType, PermissionResponse, CameraView } from 'expo-camera';
import { RefObject } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type MyPhoto = {
  id: string; // Adicionado id para uso no FlatList e navegação
  uri: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: number; 
}

export type RootStackParamList = {
  Camera: undefined;
  PhotoList: undefined;
};

export type CameraState = {
  facing: CameraType;
  permission: PermissionResponse | null;
  cameraRef: RefObject<CameraView>;
  locationGranted: boolean;
  photos: MyPhoto[];
  loading: boolean;
}


export type CameraActions = {
  requestPermission: () => void;
  requestLocationPermission: () => Promise<void>;
  toggleCameraFacing: () => void;
  capturePhoto: (navigation: CameraScreenNavigationProp) => Promise<void>;
}


export type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;