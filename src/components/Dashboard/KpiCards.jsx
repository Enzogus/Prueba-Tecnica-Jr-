import React from 'react';
import './KpiCards.css';

const KpiCards = ({ data }) => {
  // Calcular KPIs
  const totalSalaryByCompany = {};
  const totalSalaryByArea = {};
  const workersByCompany = {};
  const workersByArea = {};

  data.forEach(item => {
    // Gastos totales por empresa
    if (!totalSalaryByCompany[item.NOMBRE_EMPRESA]) {
      totalSalaryByCompany[item.NOMBRE_EMPRESA] = 0;
    }
    totalSalaryByCompany[item.NOMBRE_EMPRESA] += item.SUELDO;

    // Gastos totales por área
    if (!totalSalaryByArea[item.NOMBRE_AREA]) {
      totalSalaryByArea[item.NOMBRE_AREA] = 0;
    }
    totalSalaryByArea[item.NOMBRE_AREA] += item.SUELDO;

    // Número de trabajadores por empresa
    if (!workersByCompany[item.NOMBRE_EMPRESA]) {
      workersByCompany[item.NOMBRE_EMPRESA] = 0;
    }
    workersByCompany[item.NOMBRE_EMPRESA] += 1;

    // Número de trabajadores por área
    if (!workersByArea[item.NOMBRE_AREA]) {
      workersByArea[item.NOMBRE_AREA] = 0;
    }
    workersByArea[item.NOMBRE_AREA] += 1;
  });

  return (
    <div className="kpi-cards">
      <div className="kpi-cards__card">
        <h3 className="kpi-cards__title">Gastos por Empresa</h3>
        <ul className="kpi-cards__list">
          {Object.entries(totalSalaryByCompany).map(([company, salary]) => (
            <li key={company} className="kpi-cards__item">
              {company}: ${salary.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="kpi-cards__card">
        <h3 className="kpi-cards__title">Gastos por Área</h3>
        <ul className="kpi-cards__list">
          {Object.entries(totalSalaryByArea).map(([area, salary]) => (
            <li key={area} className="kpi-cards__item">
              {area}: ${salary.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="kpi-cards__card">
        <h3 className="kpi-cards__title">Trabajadores por Empresa</h3>
        <ul className="kpi-cards__list">
          {Object.entries(workersByCompany).map(([company, workers]) => (
            <li key={company} className="kpi-cards__item">
              {company}: {workers}
            </li>
          ))}
        </ul>
      </div>
      <div className="kpi-cards__card">
        <h3 className="kpi-cards__title">Trabajadores por Área</h3>
        <ul className="kpi-cards__list">
          {Object.entries(workersByArea).map(([area, workers]) => (
            <li key={area} className="kpi-cards__item">
              {area}: {workers}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KpiCards;