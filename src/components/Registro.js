import React, { useState } from 'react';

function Registro() {
  // Estados para guardar los valores de los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

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

    //  realizar acciones adicionales, como enviar los datos a un servidor

    // Limpia los campos después del envío
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
              Mensaje
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
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
