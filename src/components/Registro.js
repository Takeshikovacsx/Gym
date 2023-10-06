import React, { useState } from 'react';

function Registro() {
  // Estados para guardar los valores de los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios registrados

  // Manejadores de eventos para actualizar los estados cuando los campos cambian
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMensajeChange = (e) => {
    setMensaje(e.target.value);
  };

  // Manejador de evento para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo usuario con los datos ingresados
    const nuevoUsuario = {
      nombre,
      email,
      mensaje,
    };

    // Agregar el nuevo usuario a la lista de usuarios
    setUsuarios([...usuarios, nuevoUsuario]);

    // Limpia los campos después del envío
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg className="mx-auto h-10 w-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
          </svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registration Form</h2>

          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Nombre completo"
                value={nombre}
                onChange={handleNombreChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="correo@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mensaje" className="block text-sm font-medium leading-6 text-gray-900">
                Proposito De Inicio
              </label>
              <textarea
                id="mensaje"
                className="mt-1 p-2 w-full border rounded-md"
                rows="4"
                placeholder="Escribe tu mensaje aquí"
                value={mensaje}
                onChange={handleMensajeChange}
                required
              ></textarea>
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

          {/* Mostrar la lista de usuarios registrados */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Usuarios Registrados:</h3>
            <ul className="list-disc list-inside">
              {usuarios.map((usuario, index) => (
                <li key={index}>
                  Nombre: {usuario.nombre}, Email: {usuario.email}, Mensaje: {usuario.mensaje}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;
