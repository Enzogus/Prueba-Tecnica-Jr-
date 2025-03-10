import React from 'react';
import './TableFilters.css'; // Importar estilos BEM
import * as XLSX from 'xlsx'; // Importar la librería XLSX

const TableFilters = ({ companies, areas, filters, onFilterChange, minSalary, maxSalary, filteredData }) => {
  minSalary = 1200000; // Salario mínimo
  maxSalary = 3000000; // Salario máximo 
  // Función para limpiar los filtros
  const handleClearFilters = () => {
    onFilterChange({
      companies: [],
      areas: [],
      search: '',
      salaryRange: [minSalary, maxSalary],
    });
  };
   // Función para exportar a Excel
   const handleExportToExcel = () => {
    // Crear una hoja de cálculo con los datos filtrados
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Crear un libro de trabajo y agregar la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Filtrados');

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, 'datos.xlsx');
  };

  return (
    <div className="table-filters">
      <div className="table-filters__group">
        <label className="table-filters__label">Empresas:</label>
        <select
          className="table-filters__select"
          
          value={filters.companies}
          onChange={(e) =>
            onFilterChange({
              companies: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
        >
          <option value="" disabled selected hidden>Seleccione una Empresa</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      <div className="table-filters__group">
        <label className="table-filters__label">Áreas:</label>
        <select
          className="table-filters__select"
          
          value={filters.areas}
          onChange={(e) =>
            onFilterChange({
              areas: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
        >
          <option value="" disabled selected hidden>Seleccione una Área</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="table-filters__group">
        <label className="table-filters__label">Buscar (RUT o Nombre):</label>
        <input
          className="table-filters__input"
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      <div className="table-filters__group">
        <label className="table-filters__label">Rango de Sueldo:</label>
        <input
          className="table-filters__input"
          type="range"
          min={minSalary}
          max={maxSalary}
          value={filters.salaryRange[0]}
          onChange={(e) =>
            onFilterChange({ salaryRange: [e.target.value, filters.salaryRange[1]] })
          }
        />
        <span className="table-filters__range-value">
          ${filters.salaryRange[0]} - ${filters.salaryRange[1]}
        </span>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="table-filters__group">
        <button className="table-filters__clear-button" onClick={handleClearFilters}>
          Limpiar filtros
        </button>
        {/* Botón para exportar a Excel */}
      <div className="table-filters__group">
        <button className="table-filters__export-button" onClick={handleExportToExcel}>
          Exportar a Excel
        </button>
      </div>
      </div>
    </div>
  );
};

export default TableFilters;