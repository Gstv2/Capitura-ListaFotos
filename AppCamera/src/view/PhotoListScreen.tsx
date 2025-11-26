import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useCameraViewModel } from '../viewmodel/useCameraViewModel';

const PhotoListScreen = () => {
  const { photos } = useCameraViewModel(); 
  
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.uri }} style={styles.thumb} />
      <View style={styles.itemTextBlock}>
        <Text style={styles.itemTitle}>Foto: {new Date(item.timestamp).toLocaleTimeString()}</Text>
        <Text style={styles.itemCoords}>
          {item.latitude != null && item.longitude != null
            ? `Lat: ${item.latitude.toFixed(6)} Lon: ${item.longitude.toFixed(6)}`
            : 'Sem localização'}
        </Text>
      </View>
    </View>
  );
  
  if (photos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.message}>Nenhuma foto capturada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={photos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    message: { fontSize: 16, color: '#666' },
    listContent: { padding: 12, gap: 12 },
    itemRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10,
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowRadius: 4, 
        elevation: 2, 
    },
    thumb: { width: 64, height: 64, borderRadius: 6, marginRight: 12, backgroundColor: '#ddd' },
    itemTextBlock: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
    itemCoords: { fontSize: 12, color: '#333' }
});

export default PhotoListScreen;