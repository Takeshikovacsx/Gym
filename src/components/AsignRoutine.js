import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const AsignRoutine = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clientes, setClientes] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const clientesSnapshot = await firebase.db.collection('Clientes').get();
      const clientesData = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(clientesData);
    };

    const fetchRutinas = async () => {
      const rutinasSnapshot = await firebase.db.collection('Rutinas').get();
      const rutinasData = rutinasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRutinas(rutinasData);
    };

    fetchClientes();
    fetchRutinas();
  }, [firebase]);

  const formik = useFormik({
    initialValues: {
      clienteid: '',
      rutinaid: '',
    },
    onSubmit: async (values) => {
      try {
        const clienteRef = firebase.db.collection('Clientes').doc(values.cliente);
        const clienteData = await clienteRef.get();

        // Verifica si la rutina ya está asignada al cliente
        if (clienteData.exists) {
          const rutinasAsignadas = clienteData.data().rutinasAsignadas || [];

          if (rutinasAsignadas.includes(values.rutina)) {
            alert('Este cliente ya tiene asignada esta rutina.');
            return;
          }

          // Obtén el nombre del cliente
          const nombreCliente = clienteData.data().nombre;

          // Obtén todos los datos de la rutina
          const rutinaRef = await firebase.db.collection('Rutinas').doc(values.rutina).get();
          const datosRutina = rutinaRef.data();

          // Asigna la rutina al cliente
          rutinasAsignadas.push(values.rutina);
          await clienteRef.update({ rutinasAsignadas });

          // Guarda la asignación en una nueva colección
          await firebase.db.collection('AsignacionesRutinas').add({
            clienteid: values.cliente,
            nombreCliente: nombreCliente,
            rutinaid: values.rutina,
            fechaAsignacion: new Date(),
            ...datosRutina, // Agrega todos los atributos de la rutina
          });

          alert('Rutina asignada exitosamente al cliente.');
          navigate('/');
        }
      } catch (error) {
        console.error('Error al asignar la rutina:', error);
        alert('Ocurrió un error al asignar la rutina al cliente.');
      }
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Asignar Rutina a Cliente</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
            Selecciona un Cliente:
          </label>
          <select
            id="cliente"
            name="cliente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cliente}
          >
            <option value="" label="Selecciona un cliente" />
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id} label={cliente.nombre} />
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rutina" className="block text-sm font-medium text-gray-700">
            Selecciona una Rutina:
          </label>
          <select
            id="rutina"
            name="rutina"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rutina}
          >
            <option value="" label="Selecciona una rutina" />
            {rutinas.map(rutina => (
              <option key={rutina.id} value={rutina.id} label={rutina.nombreRutina} />
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Asignar Rutina
          </button>
        </div>
      </form>
    </div>
  );
};

export default AsignRoutine;
