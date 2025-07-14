export const config = {
      api: {
        url: "http://localhost:5096/api/", // Asegúrate que coincide con tu puerto
        endpoints: {
            sensorData: "sensorrecords",
            crops: "crops",
            sensors: "sensors"
        }
    },
    // Configuración base para los simuladores
    baseValues: {
        temperature: {
            dayBase: 24,        // Temperatura base durante el día
            nightBase: 18,      // Temperatura base durante la noche
            variation: 2,       // Variación máxima
            dayStart: 6,        // Hora en que comienza el día (6 AM)
            nightStart: 20       // Hora en que comienza la noche (8 PM)
        },
        ph: {
            base: 6.2,
            min: 5.8,
            max: 6.8,
            variation: 0.1      // Variación máxima por actualización
        },
        ec: {
            base: 1.8,
            min: 1.2,
            max: 2.4,
            variation: 0.1
        },
        humidity: {
            base: 70,
            min: 50,
            max: 85,
            variation: 3
        },
        waterEfficiency: {
            base: 92,
            min: 85,
            max: 98,
            variation: 1
        },
        production: {
            base: 150,          // kg/mes base
            variation: 10       // Variación máxima
        }
    },
    updateIntervals: {
        temperature: 5000,      // 5 segundos
        ph: 10000,              // 10 segundos
        ec: 10000,             // 10 segundos
        humidity: 8000,         // 8 segundos
        waterEfficiency: 15000, // 15 segundos
        production: 60000       // 1 minuto
    }
};