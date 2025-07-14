import { config } from '../config.js';
let productionInterval = null;
let currentProduction = config.baseValues.production.base;

export function startProductionSimulation() {
    if (productionInterval) clearInterval(productionInterval);
    
    console.log('Iniciando simulación de producción mensual...');
    updateProduction();
    productionInterval = setInterval(updateProduction, config.updateIntervals.production);
}

export function stopProductionSimulation() {
    if (productionInterval) {
        clearInterval(productionInterval);
        productionInterval = null;
        console.log('Simulación de producción mensual detenida');
    }
}

function updateProduction() {
    // La producción puede variar según múltiples factores
    const variation = (Math.random() * 2 - 1) * config.baseValues.production.variation;
    currentProduction += variation;
    
    // La producción no puede ser negativa
    currentProduction = Math.max(0, currentProduction);
    
    // Actualizar UI
    document.getElementById('monthly-production').textContent = Math.round(currentProduction);
    
    console.log(`Producción mensual actualizada: ${Math.round(currentProduction)} kg`);
}