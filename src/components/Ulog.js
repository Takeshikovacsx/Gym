import React from 'react';

function ULog() {
  return (
    <>
    <div>
      <header>
        {/* Tu nuevo header aquí */}
        <h1>Bienvenido, Usuario Log</h1>
        <nav>
          <ul>
            <li><a href="/rutinas">Rutinas</a></li>
            {/* Otros elementos de navegación */}
          </ul>
        </nav>
      </header>

      <main>
        {/* Contenido de la página UsuarioLog */}
        <p>¡Bienvenido a tu página de Usuario Log! Aquí puedes ver tus detalles de usuario.</p>
      </main>
    </div>
    </>
  );
}

export default ULog;
