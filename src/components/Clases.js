import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const Clases = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clases, setClases] = useState([]);
  const [reserva, setReserva] = useState('');

  // Cargar las clases disponibles desde Firebase
  useEffect(() => {
    const unsubscribe = firebase.db.collection('clases').onSnapshot((snapshot) => {
      const clasesData = [];
      snapshot.forEach((doc) => {
        clasesData.push({ id: doc.id, ...doc.data() });
      });
      setClases(clasesData);
    });

    return () => unsubscribe();
  }, [firebase.db]);

  // Función para reservar una clase
  const reservarClase = (claseId) => {
    if (reserva.trim() === '') {
      // Evitar reservas vacías
      return;
    }

    // Realizar la reserva en Firebase (aquí puedes guardar más detalles si es necesario)
    firebase.db.collection('reservas').add({
      claseId,
      usuario: reserva,
      fecha: new Date(),
    });

    // Limpiar el campo de reserva
    setReserva('');
  };

  return (
    <div>
      <h2>Clases Disponibles</h2>
      <ul>
        {clases.map((clase) => (
          <li key={clase.id}>
            <span>{clase.nombre} - {clase.horario}</span>
            <button onClick={() => reservarClase(clase.id)}>Reservar</button>
          </li>
        ))}
      </ul>

      <div>
        <h2>Reservar Clase</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={reserva}
          onChange={(e) => setReserva(e.target.value)}
        />
        <button onClick={() => reservarClase('claseId')}>Reservar</button>
      </div>
    </div>
  );
};

export default Clases;
