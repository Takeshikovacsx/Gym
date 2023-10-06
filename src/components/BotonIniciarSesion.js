import React from 'react';
import { Link } from 'react-router-dom';

function BotonIniciarSesion() {


  return (
    <>
      <Link to="/iniciar-sesion" className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
        </svg>
        Iniciar Sesión
      </Link>
    </>
  );
}

export default BotonIniciarSesion;