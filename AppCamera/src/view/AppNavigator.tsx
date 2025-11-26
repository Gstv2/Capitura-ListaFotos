import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import PhotoListScreen from './PhotoListScreen';
import { RootStackParamList } from '../model/entities/Myphotos';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ title: 'Capturar Foto' }}
        />
        <Stack.Screen 
          name="PhotoList" 
          component={PhotoListScreen} 
          options={{ title: 'Fotos Capturadas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;