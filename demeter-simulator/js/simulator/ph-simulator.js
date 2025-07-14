import { config } from '../config.js';
import { saveSensorData } from '../services.js';

let phInterval = null;
const cropId = 1; // ID del cultivo
const sensorId = 2; // ID del sensor de pH

let currentPh = config.baseValues.ph.base;

export function startPhSimulation() {
    if (phInterval) clearInterval(phInterval);
    
    console.log('Iniciando simulación de pH...');
    updatePh();
    phInterval = setInterval(updatePh, config.updateIntervals.ph);
}

export function stopPhSimulation() {
    if (phInterval) {
        clearInterval(phInterval);
        phInterval = null;
        console.log('Simulación de pH detenida');
    }
}

function updatePh() {
    // El pH cambia más lentamente y con menos variación
    const variation = (Math.random() * 2 - 1) * config.baseValues.ph.variation;
    currentPh += variation;
    
    // Mantener dentro de límites
    currentPh = Math.max(
        config.baseValues.ph.min, 
        Math.min(config.baseValues.ph.max, currentPh)
    );
    
    // Actualizar UI
    document.getElementById('ph-value').textContent = currentPh.toFixed(1);
    
    // "Guardar" en la base de datos
    saveSensorData(cropId, sensorId, currentPh)
        .catch(error => console.error('Error guardando pH:', error));
    
    console.log(`pH actualizado: ${currentPh.toFixed(1)}`);
}