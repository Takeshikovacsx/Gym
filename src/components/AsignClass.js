import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AsignClass = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clases, setClases] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClases = async () => {
      const clasesSnapshot = await firebase.db.collection('Clases').get();
      const clasesData = clasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClases(clasesData);
    };

    const fetchUsuarios = async () => {
      const usuariosSnapshot = await firebase.db.collection('Clientes').get();
      const usuariosData = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsuarios(usuariosData);
    };

    fetchClases();
    fetchUsuarios();
  }, [firebase]);

  const formik = useFormik({
    initialValues: {
      usuario: '',
      clase: '',
    },
    validationSchema: Yup.object({
      usuario: Yup.string().required('Selecciona un usuario'),
      clase: Yup.string().required('Selecciona una clase'),
    }),
    onSubmit: async (values) => {
      try {
        const usuarioSeleccionado = usuarios.find(usuario => usuario.id === values.usuario);
        const claseSeleccionada = clases.find(clase => clase.id === values.clase);

        // Verificar si el usuario ya tiene asignada la clase
        if (usuarioSeleccionado.clasesAsignadas && usuarioSeleccionado.clasesAsignadas.includes(values.clase)) {
          alert('Este usuario ya tiene asignada esta clase.');
          return;
        }

        // Realiza la lógica para asignar la clase al usuario y guarda la fecha y hora actual
        const fechaHoraAsignacion = new Date();

        // Puedes actualizar la base de datos aquí
        await firebase.db.collection('ClasesAsignadas').add({
          usuarioId: values.usuario,
          usuarioNombre: usuarioSeleccionado.nombre,
          claseId: values.clase,
          claseNombre: claseSeleccionada.nombreClase,
          fechaAsignacion: fechaHoraAsignacion,
        });

        // Actualiza las clases asignadas del usuario
        const nuevasClasesAsignadas = usuarioSeleccionado.clasesAsignadas
          ? [...usuarioSeleccionado.clasesAsignadas, values.clase]
          : [values.clase];
        await firebase.db.collection('Clientes').doc(values.usuario).update({
          clasesAsignadas: nuevasClasesAsignadas,
        });

        alert('Clase asignada exitosamente');
        formik.resetForm();
        navigate('/');
      } catch (error) {
        console.error('Error al asignar la clase:', error);
        alert('Ocurrió un error al asignar la clase');
      }
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Asignar Clases</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          <label htmlFor="clase" className="block text-sm font-medium text-gray-700">
            Selecciona una Clase:
          </label>
          <select
            id="clase"
            name="clase"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clase}
          >
            <option value="" label="Selecciona una clase" />
            {clases.map(clase => (
              <option key={clase.id} value={clase.id} label={clase.nombreClase} />
            ))}
          </select>
          {formik.touched.clase && formik.errors.clase && (
            <div className="text-red-500 text-sm">{formik.errors.clase}</div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Asignar Clase
          </button>
        </div>
      </form>
    </div>
  );
};

export default AsignClass;
