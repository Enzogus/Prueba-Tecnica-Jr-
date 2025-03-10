import * as XLSX from 'xlsx';
import dataDictionary from '../data/dicionario-de-datos.json'; // Importar el archivo JSON
import excelFile from '../data/origen-datos-junior.xlsx'; // Importar el archivo Excel

export const processExcelData = async () => {
  try {
    // Verificar que el archivo JSON tenga la estructura esperada
    if (!dataDictionary.EMPRESAS || !Array.isArray(dataDictionary.EMPRESAS)) {
      throw new Error('El archivo JSON no tiene la estructura esperada.');
    }

    // Cargar el archivo Excel
    const response = await fetch(excelFile);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Verificar que el archivo tenga al menos una hoja
    if (workbook.SheetNames.length === 0) {
      throw new Error('El archivo Excel no tiene hojas.');
    }

    // Leer la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convertir la hoja a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Combinar datos del Excel con el diccionario JSON
    const processedData = jsonData.map(item => {
      // Buscar la empresa correspondiente en el JSON
      const empresa = dataDictionary.EMPRESAS.find(emp => emp.ID_EMPRESA === item.ID_EMPRESA);

      // Buscar el área correspondiente dentro de la empresa
      const area = empresa?.AREAS.find(a => a.ID_AREA === item.ID_AREA);
      
      // Validar si el área es "RRHH" y cambiarla a "Recursos Humanos"
      if (area.NOMBRE_AREA === 'RRHH') {
        area.NOMBRE_AREA = 'Recursos Humanos';
      }

      // Validar si la profesión está en blanco o es undefined
      const profesion = item.PROFESION?.trim() || 'Sin profesión'; // Si está vacío o es undefined, usar "Sin profesión"
      
      // Cambiar formato de los sueldos
      
      return {
        ...item,
        NOMBRE_EMPRESA: empresa ? empresa.NOMBRE_EMPRESA : 'Desconocido',
        NOMBRE_AREA: area ? area.NOMBRE_AREA : 'Desconocido',
        SUELDO: area ? area.SUELDO : 0,
        PROFESION: profesion,
      };
    });

    return processedData;
  } catch (error) {
    console.error('Error al procesar el archivo Excel:', error);
    throw error; // Relanzar el error para manejarlo en App.js
  }
};