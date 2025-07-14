import { config } from '../config.js';
import { saveSensorData } from '../services.js';

let humidityInterval = null;
const cropId = 1; // ID del cultivo
const sensorId = 4; // ID del sensor de humedad

let currentHumidity = config.baseValues.humidity.base;

export function startHumiditySimulation() {
    if (humidityInterval) clearInterval(humidityInterval);
    
    console.log('Iniciando simulación de humedad...');
    updateHumidity();
    humidityInterval = setInterval(updateHumidity, config.updateIntervals.humidity);
}

export function stopHumiditySimulation() {
    if (humidityInterval) {
        clearInterval(humidityInterval);
        humidityInterval = null;
        console.log('Simulación de humedad detenida');
    }
}

function updateHumidity() {
    // La humedad puede variar más que el pH o EC
    const variation = (Math.random() * 2 - 1) * config.baseValues.humidity.variation;
    currentHumidity += variation;
    
    // Mantener dentro de límites
    currentHumidity = Math.max(
        config.baseValues.humidity.min, 
        Math.min(config.baseValues.humidity.max, currentHumidity)
    );
    
    // Actualizar UI
    document.getElementById('humidity-value').textContent = Math.round(currentHumidity) + '%';
    
    // "Guardar" en la base de datos
    saveSensorData(cropId, sensorId, currentHumidity)
        .catch(error => console.error('Error guardando humedad:', error));
    
    console.log(`Humedad actualizada: ${Math.round(currentHumidity)}%`);
}