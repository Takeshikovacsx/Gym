import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Clases = () => {
  const { firebase } = useContext(FirebaseContext);
  const [rutinas, setRutinas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRutinas = async () => {
      const rutinasSnapshot = await firebase.db.collection('Rutinas').get();
      const rutinasData = rutinasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRutinas(rutinasData);
    };

    const fetchUsuarios = async () => {
      const usuariosSnapshot = await firebase.db.collection('Clientes').get();
      const usuariosData = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsuarios(usuariosData);
    };

    fetchRutinas();
    fetchUsuarios();
  }, [firebase]);

  const formik = useFormik({
    initialValues: {
      rutina: '',
      usuario: '',
      fecha: '', // Cambiado a un string para el input tipo date
    },
    validationSchema: Yup.object({
      rutina: Yup.string().required('Selecciona una rutina'),
      usuario: Yup.string().required('Selecciona un usuario'),
      fecha: Yup.string().required('Selecciona una fecha'), // Cambiado a un string
    }),
    onSubmit: async (values) => {
      try {
        // Obtener el nombre de la rutina y el usuario
        const rutinaSeleccionada = rutinas.find(rutina => rutina.id === values.rutina);
        const usuarioSeleccionado = usuarios.find(usuario => usuario.id === values.usuario);

        // Guardar la información en la colección "Clases"
        await firebase.db.collection('Clases').add({
          rutinaId: values.rutina,
          rutinaNombre: rutinaSeleccionada.nombreRutina,
          usuarioId: values.usuario,
          usuarioNombre: usuarioSeleccionado.nombre,
          fecha: values.fecha,
        });

        alert('Clase registrada exitosamente');
        formik.resetForm();
        navigate('/');
      } catch (error) {
        console.error('Error al registrar la clase:', error);
        alert('Ocurrió un error al registrar la clase');
      }
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Clase</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {formik.touched.rutina && formik.errors.rutina && (
            <div className="text-red-500 text-sm">{formik.errors.rutina}</div>
          )}
        </div>

        <div>
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
            Selecciona un Usuario:
          </label>
          <select
            id="usuario"
            name="usuario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usuario}
          >
            <option value="" label="Selecciona un usuario" />
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id} label={usuario.nombre} />
            ))}
          </select>
          {formik.touched.usuario && formik.errors.usuario && (
            <div className="text-red-500 text-sm">{formik.errors.usuario}</div>
          )}
        </div>

        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Selecciona una Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fecha}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.fecha && formik.errors.fecha && (
            <div className="text-red-500 text-sm">{formik.errors.fecha}</div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Clases;
