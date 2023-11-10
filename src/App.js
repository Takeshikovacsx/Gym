import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Ulogueado from './components/Ulog';
import Routine from './components/Routine';
import Clases from './components/Clases';
import AsignClass from './components/AsignClass';
import AsignRoutine from './components/AsignRoutine';
import { FaDumbbell } from 'react-icons/fa';
import firebase, { FirebaseContext } from './firebase'



// Reemplaza con el nombre correcto de tu componente de registro

function App() {


  const location = useLocation();
  const Home = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Te has deslogueado');
  };

  return (

    <FirebaseContext.Provider

      value={{
        firebase
      }}>

      <div>
        <div className="bg-gray-100 min-h-screen">

          <header className="bg-gray-800 py-4">
            <div className="container mx-auto">
              <div className="flex justify-between items-center ml-20">

                <Link className="text-2xl text-white px-4 py-2 rounded-md  hover:opacity-70 flex items-center" to='/'>
                  <FaDumbbell />
                  <h1 className='ml-4 font-bold'>Home</h1>
                </Link>


                <div class="hidden lg:flex lg:gap-x-12">

                  {isLoggedIn && ( // Mostrar el enlace de "Routines" solo si el usuario ha iniciado sesión
                    <>
                      <Link to="/Rout" className='text-sm font-semibold leading-6 text-white'>
                        Register Routines
                      </Link>
                      <Link to="/Clase" className='text-sm font-semibold leading-6 text-white'>
                        Register Class
                      </Link>
                      <Link to="/Arou" className='text-sm font-semibold leading-6 text-white'>
                        Asign Routine
                      </Link>
                      <Link to="/Aclass" className='text-sm font-semibold leading-6 text-white'>
                        Asign Class
                      </Link>


                    </>


                  )}



                  <a href="#" class="text-sm font-semibold leading-6 text-white">Schedules</a>
                  <a href="#" class="text-sm font-semibold leading-6 text-white">Marketplace</a>
                  <a href="#" class="text-sm font-semibold leading-6 text-white">Company</a>
                </div>


                <div className='flex'>

                  <div className='flex'>
                    {isLoggedIn ? ( // Mostrar el enlace de "Logout" cuando el usuario ha iniciado sesión

                      <Link to="/" onClick={handleLogout} className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-md opacity-75 hover:opacity-100 ml-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                          <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                        Logout
                      </Link>
                    ) : (
                      <React.Fragment>
                        <Link to="/Login" className="bg-indigo-500 hover-bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                          </svg>
                          Login
                        </Link>

                        <Link to="/Registro" className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-md opacity-75 hover-opacity-100 ml-4 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                          </svg>
                          Register
                        </Link>
                      </React.Fragment>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </header>


          {Home && (
            <section className="bg-blue-500 py-16 text-white">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">¡Welcome to Vitality Gym!</h1>
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
            <Route path='/Clase' element={<Clases />} />
            <Route path='/Aclass' element={<AsignClass />} />
            <Route path='/Arou' element={<AsignRoutine />} />
            <Route path='/Rout' element={<Routine />} />
            <Route path='/Login' element={<Login onLogin={handleLogin} />} />
            <Route path='/Registro' element={<Registro />} />
            <Route path='/Ulog' element={<Ulogueado />} />
          </Routes>




        </div>




      </div>
      <footer className="bg-gray-800 py-10 text-white ">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Vitality Gym. Todos los derechos reservados.</p>
        </div>
      </footer>

    </FirebaseContext.Provider>

  );
}

export default App;
