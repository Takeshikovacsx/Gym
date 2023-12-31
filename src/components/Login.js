import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




function Login({ onLogin }) {
  const navigate = useNavigate(); // Utiliza useNavigate para acceder a la función de navegación
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Buscar al usuario en Firebase
      const userSnapshot = await firebase.db
        .collection('Clientes')
        .where('email', '==', email)
        .get();

      if (!userSnapshot.empty) {
        // Usuario encontrado, verificar la contraseña
        const user = userSnapshot.docs[0].data();

        if (user.contrasena === contrasena) {
          // Contraseña válida, inicio de sesión exitoso
          alert('Inicio de sesión exitoso');
          onLogin();
          navigate('/Ulog')



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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          className="mx-auto h-10 w-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          ></path>
        </svg>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={handleContrasenaChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}

          <Link to="/Registro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Resgister
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
