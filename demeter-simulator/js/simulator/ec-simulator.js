import { config } from '../config.js';
import { saveSensorData } from '../services.js';

let ecInterval = null;
const cropId = 1; // ID del cultivo
const sensorId = 3; // ID del sensor de EC

let currentEc = config.baseValues.ec.base;

export function startEcSimulation() {
    if (ecInterval) clearInterval(ecInterval);
    
    console.log('Iniciando simulación de EC...');
    updateEc();
    ecInterval = setInterval(updateEc, config.updateIntervals.ec);
}

export function stopEcSimulation() {
    if (ecInterval) {
        clearInterval(ecInterval);
        ecInterval = null;
        console.log('Simulación de EC detenida');
    }
}

function updateEc() {
    // Variación aleatoria
    const variation = (Math.random() * 2 - 1) * config.baseValues.ec.variation;
    currentEc += variation;
    
    // Mantener dentro de límites
    currentEc = Math.max(
        config.baseValues.ec.min, 
        Math.min(config.baseValues.ec.max, currentEc)
    );
    
    // Actualizar UI
    document.getElementById('ec-value').textContent = currentEc.toFixed(1) + ' mS/cm';
    
    // "Guardar" en la base de datos
    saveSensorData(cropId, sensorId, currentEc)
        .catch(error => console.error('Error guardando EC:', error));
    
    console.log(`EC actualizado: ${currentEc.toFixed(1)} mS/cm`);
}