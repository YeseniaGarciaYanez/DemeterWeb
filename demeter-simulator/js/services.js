import { config } from './config.js';

// Simuladores (valores iniciales)
let simulatedValues = {
    temperature: 24.0,
    ph: 6.2,
    ec: 1.8,
    humidity: 70,
    waterEfficiency: 92,
    production: 150
};

export async function saveSensorData(cropId, sensorId, value) {
    const data = {
        cropId,
        sensorId,
        value,
        timestamp: new Date().toISOString()
    };
    return await callApi('sensorrecords', 'POST', data);
}

// Función para hacer llamadas API con manejo de errores
async function callApi(endpoint, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${config.api.url}${endpoint}`, options);

        if (response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return null;
        }

        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en API (${endpoint}):`, error);
        
        // En caso de error, usar valores simulados
        console.warn('Usando valores simulados temporalmente');
        return simulateData(endpoint);
    }
}

// Función de simulación cuando la API falla
function simulateData(endpoint) {
    const now = new Date();
    const hour = now.getHours();
    
    switch(endpoint) {
        case 'sensorrecords/temperature':
            // Simular temperatura basada en hora del día
            const isDay = hour >= 6 && hour < 20;
            simulatedValues.temperature = isDay 
                ? 24 + (Math.random() * 2 - 1) 
                : 18 + (Math.random() * 2 - 1);
            return { value: simulatedValues.temperature };
            
        case 'sensorrecords/ph':
            // Simular pH con cambios graduales
            simulatedValues.ph = Math.max(5.8, Math.min(6.8, 
                simulatedValues.ph + (Math.random() * 0.2 - 0.1)));
            return { value: simulatedValues.ph };
            
        case 'sensorrecords/ec':
            // Simular EC con cambios graduales
            simulatedValues.ec = Math.max(1.2, Math.min(2.4, 
                simulatedValues.ec + (Math.random() * 0.2 - 0.1)));
            return { value: simulatedValues.ec };
            
        case 'sensorrecords/humidity':
            // Simular humedad
            simulatedValues.humidity = Math.max(50, Math.min(85, 
                simulatedValues.humidity + (Math.random() * 6 - 3)));
            return { value: simulatedValues.humidity };
            
        case 'water-efficiency':
            // Simular eficiencia de agua
            simulatedValues.waterEfficiency = Math.max(85, Math.min(98, 
                simulatedValues.waterEfficiency + (Math.random() * 2 - 1)));
            return { value: simulatedValues.waterEfficiency };
            
        case 'production':
            // Simular producción
            simulatedValues.production = Math.max(140, 
                simulatedValues.production + (Math.random() * 20 - 10));
            return { value: simulatedValues.production };
            
        default:
            // Para endpoints desconocidos, devolver datos simulados básicos
            return { 
                value: 0,
                simulated: true,
                timestamp: now.toISOString() 
            };
    }
}

// Funciones de la API
export const api = {
    // Autenticación
    async login(email, password) {
        const response = await callApi('auth/login', 'POST', { email, password });
        if (response && response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    },

    // Datos de sensores
    async saveSensorData(cropId, sensorId, value) {
        const data = {
            cropId,
            sensorId,
            value,
            timestamp: new Date().toISOString()
        };
        return await callApi('sensorrecords', 'POST', data);
    },

    async getSensorData(cropId, sensorId, hours = 24) {
        return await callApi(`sensorrecords/${cropId}/${sensorId}?hours=${hours}`);
    },

    // Datos de cultivos
    async getCrop(cropId) {
        return await callApi(`crops/${cropId}`);
    },

    // Datos de sensores disponibles
    async getSensors() {
        return await callApi('sensors');
    },

    // Métodos específicos para cada tipo de sensor
    async getTemperatureData(cropId, hours = 24) {
        return await this.getSensorData(cropId, 1, hours); // ID 1 para temperatura
    },

    async getPHData(cropId, hours = 24) {
        return await this.getSensorData(cropId, 2, hours); // ID 2 para pH
    },

    async getECData(cropId, hours = 24) {
        return await this.getSensorData(cropId, 3, hours); // ID 3 para EC
    },

    async getHumidityData(cropId, hours = 24) {
        return await this.getSensorData(cropId, 4, hours); // ID 4 para humedad
    },

    // Métodos para las estadísticas
    async getWaterEfficiency(cropId) {
        return await callApi(`water-efficiency/${cropId}`);
    },

    async getProductionData(cropId) {
        return await callApi(`production/${cropId}`);
    }
};

// Simuladores (para uso cuando la API no está disponible)
export const simulators = {
    startAll() {
        console.log("Simuladores iniciados (modo offline)");
        // Actualizar valores simulados cada 5 segundos
        this.interval = setInterval(() => {
            simulatedValues = {
                temperature: this.getSimulatedTemperature(),
                ph: this.getSimulatedPH(),
                ec: this.getSimulatedEC(),
                humidity: this.getSimulatedHumidity(),
                waterEfficiency: this.getSimulatedWaterEfficiency(),
                production: this.getSimulatedProduction()
            };
        }, 5000);
    },

    stopAll() {
        if (this.interval) {
            clearInterval(this.interval);
            console.log("Simuladores detenidos");
        }
    },

    getSimulatedTemperature() {
        const now = new Date();
        const hour = now.getHours();
        const isDay = hour >= 6 && hour < 20;
        const baseTemp = isDay ? 24 : 18;
        return baseTemp + (Math.random() * 2 - 1);
    },

    getSimulatedPH() {
        return Math.max(5.8, Math.min(6.8, 
            simulatedValues.ph + (Math.random() * 0.1 - 0.05)));
    },

    getSimulatedEC() {
        return Math.max(1.2, Math.min(2.4, 
            simulatedValues.ec + (Math.random() * 0.1 - 0.05)));
    },

    getSimulatedHumidity() {
        return Math.max(50, Math.min(85, 
            simulatedValues.humidity + (Math.random() * 4 - 2)));
    },

    getSimulatedWaterEfficiency() {
        return Math.max(85, Math.min(98, 
            simulatedValues.waterEfficiency + (Math.random() * 1 - 0.5)));
    },

    getSimulatedProduction() {
        return Math.max(140, 
            simulatedValues.production + (Math.random() * 10 - 5));
    }
};