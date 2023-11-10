import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Clases = () => {
  const { firebase } = useContext(FirebaseContext);
  const [rutinas, setRutinas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRutinas = async () => {
      const rutinasSnapshot = await firebase.db.collection('Rutinas').get();
      const rutinasData = rutinasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRutinas(rutinasData);
    };

    fetchRutinas();
  }, [firebase]);

  const formik = useFormik({
    initialValues: {
      rutina: '',
      fecha: new Date().toISOString().split('T')[0], // Inicializa con la fecha actual
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Inicializa con la hora actual
      nombreClase: '', // Nuevo campo para el nombre de la clase
    },
    validationSchema: Yup.object({
      rutina: Yup.string().required('Selecciona una rutina'),
      fecha: Yup.string().required('Selecciona una fecha'),
      hora: Yup.string().required('Selecciona una hora'),
      nombreClase: Yup.string().required('Ingresa el nombre de la clase'), // Nueva validación
    }),
    onSubmit: async (values) => {
      try {
        const rutinaSeleccionada = rutinas.find(rutina => rutina.id === values.rutina);

        // Combina la fecha y la hora en un objeto Date
        const fechaHora = new Date(`${values.fecha} ${values.hora}`);

        await firebase.db.collection('Clases').add({
          rutinaId: values.rutina,
          rutinaNombre: rutinaSeleccionada.nombreRutina,
          fecha: fechaHora,
          nombreClase: values.nombreClase, // Nuevo campo
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
          <label htmlFor="nombreClase" className="block text-sm font-medium text-gray-700">
            Nombre de la Clase:
          </label>
          <input
            type="text"
            id="nombreClase"
            name="nombreClase"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombreClase}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.nombreClase && formik.errors.nombreClase && (
            <div className="text-red-500 text-sm">{formik.errors.nombreClase}</div>
          )}
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
          {formik.touched.rutina && formik.errors.rutina && (
            <div className="text-red-500 text-sm">{formik.errors.rutina}</div>
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
            min={new Date().toISOString().split('T')[0]} // Establece la fecha mínima como la fecha actual
          />
          {formik.touched.fecha && formik.errors.fecha && (
            <div className="text-red-500 text-sm">{formik.errors.fecha}</div>
          )}
        </div>

        <div>
          <label htmlFor="hora" className="block text-sm font-medium text-gray-700">
            Selecciona una Hora:
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hora}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.hora && formik.errors.hora && (
            <div className="text-red-500 text-sm">{formik.errors.hora}</div>
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
