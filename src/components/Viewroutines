import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import firebase from '../firebase'; // Asegúrate de importar el módulo de Firebase correcto

const ViewRoutines = () => {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const rutinasRef = await firebase.db.collection('Rutinas').get();
        const rutinasData = rutinasRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRutinas(rutinasData);
      } catch (error) {
        console.error('Error al obtener rutinas:', error);
      }
    };

    fetchRutinas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.rutinaContainer}>
      <Text style={styles.rutinaTitle}>Nombre de la Rutina: {item.nombreRutina}</Text>
      <Image source={{ uri: item.imagen }} style={styles.rutinaImage} />
      <Text style={styles.rutinaText}>Tipo de Ejercicio: {item.tipoEjercicio}</Text>
      <Text style={styles.rutinaText}>Duración de la Rutina: {item.duracionRutina} minutos</Text>
      <Text style={styles.rutinaText}>Descripción: {item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutinas Existentes:</Text>
      <FlatList
        data={rutinas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  rutinaContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
  },
  rutinaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rutinaImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  rutinaText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ViewRoutines;
