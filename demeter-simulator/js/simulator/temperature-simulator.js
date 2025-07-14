import { config } from '../config.js';
import { saveSensorData } from '../services.js';

let temperatureInterval = null;
const cropId = 1; // ID del cultivo que estamos monitoreando
const sensorId = 1; // ID del sensor de temperatura

export function startTemperatureSimulation() {
    if (temperatureInterval) clearInterval(temperatureInterval);
    
    console.log('Iniciando simulación de temperatura...');
    updateTemperature();
    temperatureInterval = setInterval(updateTemperature, config.updateIntervals.temperature);
}

export function stopTemperatureSimulation() {
    if (temperatureInterval) {
        clearInterval(temperatureInterval);
        temperatureInterval = null;
        console.log('Simulación de temperatura detenida');
    }
}

function updateTemperature() {
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= config.baseValues.temperature.dayStart && hour < config.baseValues.temperature.nightStart;
    
    // Temperatura base según la hora del día
    let baseTemp = isDay ? config.baseValues.temperature.dayBase : config.baseValues.temperature.nightBase;
    
    // Variación aleatoria
    const variation = (Math.random() * 2 - 1) * config.baseValues.temperature.variation;
    let currentTemp = baseTemp + variation;
    
    // Asegurarse de que está dentro de límites razonables
    currentTemp = Math.max(
        config.baseValues.temperature.nightBase - 3, 
        Math.min(
            config.baseValues.temperature.dayBase + 3, 
            currentTemp
        )
    );
    
    // Actualizar la UI
    document.getElementById('temperature-value').textContent = currentTemp.toFixed(1) + '°C';
    
    // "Guardar" en la base de datos
    saveSensorData(cropId, sensorId, currentTemp)
        .catch(error => console.error('Error guardando temperatura:', error));
    
    console.log(`Temperatura actualizada: ${currentTemp.toFixed(1)}°C (${isDay ? 'Día' : 'Noche'})`);
}