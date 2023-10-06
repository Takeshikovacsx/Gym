import React from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import BotonIniciarSesion from './components/BotonIniciarSesion';
import BotonRegistrarse from './components/BotonRegistrarse';
import ComponenteIniciarSesion from './components/BotonIniciarSesion'; // Reemplaza con el nombre correcto de tu componente de inicio de sesión
import ComponenteRegistro from './components/Registro';
import Form from './components/Registro';
import Login from './components/Login';
import Registro from './components/Registro';

// Reemplaza con el nombre correcto de tu componente de registro

function App() {
  return (

    <div>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-gray-800 py-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-white font-semibold">Gimnasio</h1>
              <div className='flex'>

                <Link to="/Login" className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                  </svg>
                
                  Iniciar Sesión
                  
                </Link>



                <Link to="/Registro" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md opacity-75 hover:opacity-100 ml-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                  </svg>
                  <button>
                    Registrarse
                  </button>

                </Link>

                








              </div>

            </div>
          </div>
        </header>


        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Registro' element={<Registro />} />

        </Routes>

      </div>




    </div>
  );
}

export default App;
