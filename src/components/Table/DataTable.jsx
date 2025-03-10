import React, { useState, useEffect } from 'react'; 
import '../Table/DataTable.css'; 

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const rowsPerPage = 5; // Número de filas por página

  // Reiniciar la página actual cuando los datos cambien
  useEffect(() => {
    setCurrentPage(1); 
  }, [data]); 

  // Calcular los datos que deben mostrarse en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="data-table">
      <table className="data-table__table">
        <thead className="data-table__header">
          <tr className="data-table__row">
            <th className="data-table__cell">Nombre Empresa</th>
            <th className="data-table__cell">Área</th>
            <th className="data-table__cell">RUT Trabajador</th>
            <th className="data-table__cell">Nombre Trabajador</th>
            <th className="data-table__cell">Edad</th>
            <th className="data-table__cell">Profesión</th>
            <th className="data-table__cell">Cargo</th>
            <th className="data-table__cell">Sueldo</th>
          </tr>
        </thead>
        <tbody className="data-table__body">
          {currentRows.map((item, index) => (
            <tr key={`${currentPage}-${index}`} className="data-table__row">
              <td className="data-table__cell">{item.NOMBRE_EMPRESA}</td>
              <td className="data-table__cell">{item.NOMBRE_AREA}</td>
              <td className="data-table__cell">{item.RUT_TRABAJADOR}</td>
              <td className="data-table__cell">{item.NOMBRE_TRABAJADOR}</td>
              <td className="data-table__cell">{item.EDAD}</td>
              <td className="data-table__cell">{item.PROFESION}</td>
              <td className="data-table__cell">{item.CARGO}</td>
              <td className="data-table__cell">
                {item.SUELDO.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP',
                  minimumFractionDigits: 0, // Sin decimales
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div className="data-table__pagination">
        <button
          className="data-table__pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="data-table__pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="data-table__pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DataTable;