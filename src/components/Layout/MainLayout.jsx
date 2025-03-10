import React from 'react';
import './MainLayout.css'; // Importar estilos BEM

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <main className="main-layout__content">
        {children}
      </main>
      
    </div>
  );
};

export default MainLayout;