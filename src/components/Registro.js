import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FirebaseContext} from '../firebase'

function Registro() {

  const {firebase} = useContext(FirebaseContext);
  const formik = useFormik({
    initialValues: {
      nombre: '',
      cedula: '',
      nombreUsuario: '',
      email: '',
      contrasena: '',
      mensaje: ''
    },


    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(10, 'El nombre de usuario debe tener al menos 10 letras')
        .required('El campo de nombre es requerido'),
      cedula: Yup.number()
        .test('len', 'El campo debe tener 10 números', val => val && val.toString().length === 10)
        .required('El campo de cédula es requerido'),
      nombreUsuario: Yup.string()
        .min(5, 'El nombre de usuario debe tener al menos 5 letras')
        .required('El campo de nombre de usuario es requerido'),
      email: Yup.string()
        .email('Correo electrónico no válido')
        .required('El campo de email es requerido'),
      contrasena: Yup.string()
        .min(10, 'La contraseña debe tener al menos 10 caracteres')
        .required('El campo de contraseña es requerido'),
        
    }),
    onSubmit: reg => {
      try {
        console.log(reg);
        firebase.db.collection('Clientes').add(reg)
        alert('Se ha registrado exitosamente')
        formik.resetForm();
        

      } catch (e) {
        console.log(e);
      }
    }
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg className="mx-auto h-10 w-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
          </svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Formulario de Registro</h2>

          <form  onSubmit={formik.handleSubmit}  className="space-y-6" action="#">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Nombre completo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="cedula" className="block text-sm font-medium leading-6 text-gray-900">
                Cédula
              </label>
              <input
                type="number"
                id="cedula"
                name="cedula"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Número de cédula"
                maxLength={10}
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.cedula && formik.errors.cedula ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.cedula}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="nombreUsuario" className="block text-sm font-medium leading-6 text-gray-900">
                Nick Name
              </label>
              <input
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Nick Name"
                value={formik.values.nombreUsuario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.nombreUsuario && formik.errors.nombreUsuario ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.nombreUsuario}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="correo@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="contrasena" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Contraseña"
                value={formik.values.contrasena}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.contrasena && formik.errors.contrasena ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.contrasena}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="mensaje" className="block text-sm font-medium leading-6 text-gray-900">
                Propósito de Registro
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="mt-1 p-2 w-full border rounded-md"
                rows="4"
                placeholder="Escribe tu mensaje aquí"
                value={formik.values.mensaje}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              ></textarea>
            </div>
            {formik.touched.mensaje && formik.errors.mensaje ? (
              <div>
                <p>Ocurrió un error</p>
                <p>{formik.errors.mensaje}</p>
              </div>
            ) : null}

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
      </div>
    </>
  );
}

export default Registro