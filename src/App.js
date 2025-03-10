import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/Layout/MainLayout';
import DataTable from './components/Table/DataTable';
import TableFilters from './components/Table/TableFilters';
import KpiCards from './components/Dashboard/KpiCards';
import { processExcelData } from './utils/dataProcessor';
import './App.css'; 

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  // Estados para manejar los datos y filtros
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filters, setFilters] = useState({
    companies: [],
    areas: [],
    search: '',
    salaryRange: [1200000, 3000000], // Valores iniciales arbitrarios, se actualizarán
  });

  // Cargar y procesar datos al inicio
  useEffect(() => {
    const loadData = async () => {
      try {
        // Procesar datos del Excel y el diccionario JSON
        const processedData = await processExcelData();
        setData(processedData);
        setFilteredData(processedData);
        
        // Extraer empresas y áreas únicas para los filtros
        const uniqueCompanies = [...new Set(processedData.map(item => item.NOMBRE_EMPRESA))];
        const uniqueAreas = [...new Set(processedData.map(item => item.NOMBRE_AREA))];
        
        setCompanies(uniqueCompanies);
        setAreas(uniqueAreas);
        
        // Determinar rango de sueldos min/max
        const salaries = processedData.map(item => item.SUELDO);
        const minSalary = Math.min(...salaries);
        const maxSalary = Math.max(...salaries);
        
        setFilters(prev => ({
          ...prev,
          salaryRange: [minSalary, maxSalary]
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const applyFilters = () => {
      let result = [...data];
      
      // Filtrar por empresas seleccionadas
      if (filters.companies.length > 0) {
        result = result.filter(item => filters.companies.includes(item.NOMBRE_EMPRESA));
      }
      
      // Filtrar por áreas seleccionadas
      if (filters.areas.length > 0) {
        result = result.filter(item => filters.areas.includes(item.NOMBRE_AREA));
      }
      
      // Filtrar por búsqueda (RUT o nombre)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(
          item => 
            item.RUT_TRABAJADOR.toLowerCase().includes(searchTerm) || 
            item.NOMBRE_TRABAJADOR.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filtrar por rango de sueldo
      result = result.filter(
        item => 
          item.SUELDO >= filters.salaryRange[0] && 
          item.SUELDO <= filters.salaryRange[1]
      );
      
      setFilteredData(result);
    };
    
    applyFilters();
  }, [filters, data]);

  // Manejar cambios en los filtros
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <div className="app">
          {loading ? (
            <div className="app__loading">
              <CircularProgress />
            </div>
          ) : (
            <Container maxWidth="xl" className="app__container">
              
              
              <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <TableFilters 
                  companies={companies}
                  areas={areas}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  minSalary={filters.salaryRange[0]}
                  maxSalary={filters.salaryRange[1]}
                  filteredData={filteredData}
                />
              </Paper>
              
              <Paper elevation={3} sx={{ mb: 4 }}>
                <DataTable 
                  data={filteredData} 
                  allData={data}
                />
              </Paper>
              
              <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <div className="kpi">
                  <Typography variant="h4" component="h2" className="kpi__title">
                    KPI
                  </Typography>
                  <KpiCards data={data} />
                </div>
              </Paper>
            </Container>
          )}
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;