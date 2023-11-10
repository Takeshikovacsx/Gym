import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FirebaseContext from '../context/firebase/firebaseContext';
import firebase from '../firebase';
import Svg, { Path } from 'react-native-svg';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleContrasenaChange = (text) => {
    setContrasena(text);
  };

  const handleLogin = async () => {
    try {
      const userSnapshot = await firebase.db
        .collection('Clientes')
        .where('email', '==', email)
        .get();
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        if (userData.contrasena === contrasena) {
          // Contraseña válida, inicio de sesión exitoso
          alert('Inicio de sesión exitoso');

          // Llama a la función de FirebaseContext si es necesario
          const userId = userDoc.id; // Obten el ID del cliente
          navigation.navigate('AssignedRoutines', { userId }); // Pasa el ID como parámetro
        } else {
          // Contraseña incorrecta
          alert('Contraseña incorrecta');
        }
      } else {
        // Usuario no encontrado
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Svg width="100" height="100" viewBox="0 0 24 24">
          <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5z01 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632" fill="black" />
        </Svg>
      </View>
      <Text style={styles.title}>Sign in to your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email address"
          placeholderTextColor="gray"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={contrasena}
          onChangeText={handleContrasenaChange}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
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
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    color: 'black',
  },
  button: {
    backgroundColor: 'indigo',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
