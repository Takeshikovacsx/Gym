import React from 'react';
import { Link } from 'react-router-dom';


function BotonRegistrarse() {
  return (

    <>
        <Link to="/Registro" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md opacity-75 hover:opacity-100 ml-4 flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
        </svg>
        Registrarse

        </Link>
    </>
  );
}

export default BotonRegistrarse;
