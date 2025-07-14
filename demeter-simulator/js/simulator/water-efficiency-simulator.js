import { config } from '../config.js';

let efficiencyInterval = null;
let currentEfficiency = config.baseValues.waterEfficiency.base;

export function startEfficiencySimulation() {
    if (efficiencyInterval) clearInterval(efficiencyInterval);
    
    console.log('Iniciando simulación de eficiencia del agua...');
    updateEfficiency();
    efficiencyInterval = setInterval(updateEfficiency, config.updateIntervals.waterEfficiency);
}

export function stopEfficiencySimulation() {
    if (efficiencyInterval) {
        clearInterval(efficiencyInterval);
        efficiencyInterval = null;
        console.log('Simulación de eficiencia del agua detenida');
    }
}

function updateEfficiency() {
    // La eficiencia cambia muy lentamente
    const variation = (Math.random() * 2 - 1) * config.baseValues.waterEfficiency.variation;
    currentEfficiency += variation;
    
    // Mantener dentro de límites
    currentEfficiency = Math.max(
        config.baseValues.waterEfficiency.min, 
        Math.min(config.baseValues.waterEfficiency.max, currentEfficiency)
    );
    
    // Actualizar UI
    document.getElementById('water-efficiency').textContent = Math.round(currentEfficiency) + '%';
    
    console.log(`Eficiencia del agua actualizada: ${Math.round(currentEfficiency)}%`);
}