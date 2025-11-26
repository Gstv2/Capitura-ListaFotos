import React from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

import { useCameraViewModel } from '../viewmodel/useCameraViewModel';
import { CameraScreenNavigationProp } from '../model/entities/Myphotos';

const CameraScreen = () => {
  const { 
    facing, 
    permission, 
    cameraRef, 
    locationGranted, 
    loading,
    requestPermission, 
    requestLocationPermission, 
    toggleCameraFacing, 
    capturePhoto 
  } = useCameraViewModel();
  
  const navigation = useNavigation<CameraScreenNavigationProp>();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos de permissão para usar sua câmera.</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  if (!locationGranted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos de permissão para obter sua localização.</Text>
        <Button onPress={requestLocationPermission} title="Conceder Permissão" />
      </View>
    );
  }

  if (loading) {
     return (
        <View style={styles.container}>
            <Text style={styles.message}>Capturando foto e localização...</Text>
        </View>
     );
  }
  
  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef} 
        style={styles.camera} 
        facing={facing} 
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => capturePhoto(navigation)}>
          <Text style={styles.text}>Capturar</Text>
        </TouchableOpacity>
        <Button title="Ver Lista" onPress={() => navigation.navigate('PhotoList')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    message: { textAlign: 'center', paddingBottom: 10 },
    camera: { 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    controls: { 
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 8,
    },
    text: { color: 'white', fontWeight: 'bold' }
});


export default CameraScreen;