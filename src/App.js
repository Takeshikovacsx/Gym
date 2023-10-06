import React from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import BotonIniciarSesion from './components/BotonIniciarSesion';
import BotonRegistrarse from './components/BotonRegistrarse';
import ComponenteIniciarSesion from './components/BotonIniciarSesion'; // Reemplaza con el nombre correcto de tu componente de inicio de sesión
import ComponenteRegistro from './components/Registro';
import Login from './components/Login';
import Registro from './components/Registro';
import { FaDumbbell } from 'react-icons/fa';




// Reemplaza con el nombre correcto de tu componente de registro

function App() {
  const location = useLocation();
  const Home = location.pathname === '/';

  return (

    <div>
      <div className="bg-gray-100 min-h-screen">

        <header className="bg-gray-800 py-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center ml-20">

              <Link className="text-2xl text-white px-4 py-2 rounded-md  hover:opacity-70 flex items-center" to='/'>
                <FaDumbbell/>



                <h1 className='ml-4 font-bold'>Home</h1>
              </Link>


              <div className='flex'>

                <Link to="/Login" className="bg-indigo-500 hover:bg-indigo-700 text-white  px-4 py-2 rounded-md flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                  </svg>
                  Login
                </Link>

                <Link to="/Registro" className="bg-gray-700 hover:bg-gray-900 text-white  py-2 px-4 rounded-md opacity-75 hover:opacity-100 ml-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                  </svg>
                  Register
                </Link>

              </div>
            </div>
          </div>
        </header>

        {Home && (
          <section className="bg-blue-500 py-16 text-white">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">¡Bienvenido a nuestro Gimnasio!</h1>
              <p className="text-lg mb-8">¡Bienvenido al Gimnasio Vitality!

En Vitality, nuestra pasión es ayudarte a alcanzar tus objetivos de bienestar y a llevar un estilo de vida saludable. Nos enorgullece ser tu socio en este emocionante viaje hacia la salud y el bienestar.

Nuestro gimnasio está diseñado para ofrecerte un espacio inspirador donde puedas desafiar tus límites, superar tus metas y transformar tu cuerpo y mente. Ofrecemos una amplia variedad de equipos de vanguardia, clases dirigidas por expertos y un equipo de entrenadores profesionales que están comprometidos con tu éxito.

Ya sea que estés buscando aumentar tu fuerza, mejorar tu resistencia, perder peso o simplemente mantener un estilo de vida activo, en Vitality encontrarás todo lo que necesitas. Nuestro ambiente acogedor y motivador te inspirará a dar lo mejor de ti en cada entrenamiento.</p>
              <button className="bg-white text-blue-500 hover:bg-blue-100 text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out">
                Empezar
              </button>
            </div>
          </section>
        )}


        <Routes>
          <Route path='/' element={App} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Registro' element={<Registro />} />
        </Routes>




      </div>




    </div>
  );
}

export default App;
