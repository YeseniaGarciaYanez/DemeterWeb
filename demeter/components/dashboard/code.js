  // Configuración corregida para coincidir con el backend C#
        const API_URL = 'http://localhost:5096/api/sensor/records';
        const ALERTS_URL = 'http://localhost:5096/api/alert';
        const CROP_ID = 1; // ID del cultivo principal
        const SENSOR_IDS = {
            temperature: 1,  // Temperatura
            ph: 2,           // pH
            ec: 3,           // Conductividad Eléctrica
            humidity: 4      // Humedad
        };

        // Estado de la aplicación
        const state = {
            intervals: {},
            simulatedValues: {
                temperature: 24.0,
                ph: 6.2,
                ec: 1.8,
                humidity: 70,
                waterEfficiency: 92,
                production: 150
            },
            apiOnline: false,
            sendToAPI: true,
            phEcChart: null,
            historicalData: {
                ph: [],
                ec: []
            },
            alertLog: []
        };

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            initCharts();
            setupEventListeners();
            checkAPIStatus();
            loadRecentAlerts();
        });

        // Configurar gráficos
        function initCharts() {
            const ctx = document.getElementById('ph-ec-chart').getContext('2d');
            state.phEcChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array(15).fill(''),
                    datasets: [
                        {
                            label: 'pH',
                            data: Array(15).fill(6.2),
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            tension: 0.1,
                            yAxisID: 'y'
                        },
                        {
                            label: 'EC (mS/cm)',
                            data: Array(15).fill(1.8),
                            borderColor: '#2196F3',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            tension: 0.1,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'pH'
                            },
                            min: 5,
                            max: 8
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'EC (mS/cm)'
                            },
                            min: 0,
                            max: 3,
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
        }

        // Configurar event listeners
        function setupEventListeners() {
            document.getElementById('button-start').addEventListener('click', startAllSimulations);
            document.getElementById('button-stop').addEventListener('click', stopAllSimulations);
            document.getElementById('button-test-connection').addEventListener('click', testConnection);
            document.getElementById('api-toggle').addEventListener('change', (e) => {
                state.sendToAPI = e.target.checked;
                updateConnectionStatus();
            });
        }

        // Probar conexión manualmente
        async function testConnection() {
            const button = document.getElementById('button-test-connection');
            button.disabled = true;
            button.textContent = 'Probando...';
            
            try {
                const testData = {
                    crop_id: CROP_ID,
                    sensor_id: SENSOR_IDS.temperature,
                    value: 25.0
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(testData)
                });

                if (response.ok) {
                    state.apiOnline = true;
                    addAlert('green', 'Conexión exitosa con el backend');
                } else {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
            } catch (error) {
                state.apiOnline = false;
                addAlert('red', `Error de conexión: ${error.message}`);
                console.error('Error de conexión:', error);
            }

            updateConnectionStatus();
            button.disabled = false;
            button.textContent = 'Probar Conexión';
        }

        // Verificar estado de la API
        async function checkAPIStatus() {
            try {
                const response = await fetch(API_URL.replace('/records', ''), {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                state.apiOnline = response.ok;
            } catch (error) {
                state.apiOnline = false;
            }
            updateConnectionStatus();
        }

        // Actualizar estado de conexión
        function updateConnectionStatus() {
            const statusElement = document.getElementById('connection-status');
            
            if (!state.sendToAPI) {
                statusElement.textContent = "Modo simulación local (datos no se envían)";
                statusElement.className = "connection-status offline";
                return;
            }
            
            if (state.apiOnline) {
                statusElement.textContent = "Conectado al backend - Datos en tiempo real";
                statusElement.className = "connection-status online";
            } else {
                statusElement.textContent = "Conexión perdida - Datos almacenados localmente";
                statusElement.className = "connection-status offline";
            }
        }

        // Cargar alertas recientes
        async function loadRecentAlerts() {
            if (!state.sendToAPI) return;
            
            try {
                const response = await fetch(ALERTS_URL);
                if (response.ok) {
                    const alerts = await response.json();
                    alerts.slice(0, 5).forEach(alert => {
                        addAlert(alert.severity, alert.description, false);
                    });
                }
            } catch (error) {
                console.log('No se pudieron cargar las alertas:', error);
            }
        }

        // Agregar alerta al log
        function addAlert(severity, message, isNew = true) {
            const alertLog = document.getElementById('alert-log');
            
            // Si no hay alertas, eliminar el mensaje de "No hay alertas"
            if (alertLog.firstChild?.className === "text-muted") {
                alertLog.removeChild(alertLog.firstChild);
            }
            
            const timestamp = new Date().toLocaleTimeString();
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item alert-${severity}`;
            alertItem.innerHTML = `<strong>${timestamp}</strong>: ${message}`;
            
            if (isNew) {
                alertLog.insertBefore(alertItem, alertLog.firstChild);
            } else {
                alertLog.appendChild(alertItem);
            }
            
            // Mantener solo las últimas 10 alertas
            while (alertLog.children.length > 10) {
                alertLog.removeChild(alertLog.lastChild);
            }
        }

        // Iniciar todas las simulaciones
        function startAllSimulations() {
            stopAllSimulations();
            
            startSimulation('temperature', updateTemperature, 5000);
            startSimulation('ph', updatePH, 10000);
            startSimulation('ec', updateEC, 10000);
            startSimulation('humidity', updateHumidity, 8000);
            startSimulation('waterEfficiency', updateWaterEfficiency, 15000);
            startSimulation('production', updateProduction, 60000);
            
            addAlert('green', 'Simulación iniciada');
            updateConnectionStatus();
        }

        // Detener todas las simulaciones
        function stopAllSimulations() {
            Object.keys(state.intervals).forEach(key => {
                clearInterval(state.intervals[key]);
            });
            state.intervals = {};
            addAlert('yellow', 'Simulación detenida');
        }

        // Iniciar una simulación específica
        function startSimulation(name, updateFunction, interval) {
            updateFunction();
            state.intervals[name] = setInterval(updateFunction, interval);
        }

        // Función para enviar datos al backend
        async function sendToAPI(sensor_id, value) {
            if (!state.sendToAPI) return true;
            
            try {
                const sensorData = {
                    crop_id: CROP_ID,
                    sensor_id: sensor_id,
                    value: parseFloat(value.toFixed(2))
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(sensorData)
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
                
                if (!state.apiOnline) {
                    state.apiOnline = true;
                    updateConnectionStatus();
                    addAlert('green', 'Conexión restaurada con el backend');
                }
                
                return true;
            } catch (error) {
                if (state.apiOnline) {
                    state.apiOnline = false;
                    updateConnectionStatus();
                    addAlert('red', `Error de conexión: ${error.message}`);
                }
                console.error(`Error enviando datos (Sensor ${sensor_id}):`, error);
                return false;
            }
        }

        // Actualizadores específicos para cada métrica
        function updateTemperature() {
            const now = new Date();
            const hour = now.getHours();
            const isDay = hour >= 6 && hour < 20;
            
            const variation = (Math.random() * 2 - 1) * (isDay ? 1.5 : 0.8);
            state.simulatedValues.temperature = isDay 
                ? 24 + variation 
                : 18 + variation;
            
            state.simulatedValues.temperature = Math.max(15, Math.min(35, state.simulatedValues.temperature));
            
            document.getElementById('temperature-value').textContent = 
                state.simulatedValues.temperature.toFixed(1) + '°C';
            
            sendToAPI(SENSOR_IDS.temperature, state.simulatedValues.temperature);
        }

        function updatePH() {
            const variation = (Math.random() * 2 - 1) * 0.1;
            state.simulatedValues.ph += variation;
            
            state.simulatedValues.ph = Math.max(5.8, Math.min(6.8, state.simulatedValues.ph));
            
            document.getElementById('ph-value').textContent = state.simulatedValues.ph.toFixed(2);
            
            updateChartData('ph', state.simulatedValues.ph);
            
            sendToAPI(SENSOR_IDS.ph, state.simulatedValues.ph);
        }

        function updateEC() {
            const variation = (Math.random() * 2 - 1) * 0.15;
            state.simulatedValues.ec += variation;
            
            state.simulatedValues.ec = Math.max(1.2, Math.min(2.4, state.simulatedValues.ec));
            
            document.getElementById('ec-value').textContent = state.simulatedValues.ec.toFixed(2) + ' mS/cm';
            
            updateChartData('ec', state.simulatedValues.ec);
            
            sendToAPI(SENSOR_IDS.ec, state.simulatedValues.ec);
        }

        function updateHumidity() {
            const variation = (Math.random() * 2 - 1) * 3;
            state.simulatedValues.humidity += variation;
            
            state.simulatedValues.humidity = Math.max(50, Math.min(85, state.simulatedValues.humidity));
            
            document.getElementById('humidity-value').textContent = Math.round(state.simulatedValues.humidity) + '%';
            
            sendToAPI(SENSOR_IDS.humidity, state.simulatedValues.humidity);
        }

        function updateWaterEfficiency() {
            const variation = (Math.random() * 2 - 1) * 0.5;
            state.simulatedValues.waterEfficiency += variation;
            
            state.simulatedValues.waterEfficiency = Math.max(85, Math.min(98, state.simulatedValues.waterEfficiency));
            
            document.getElementById('water-efficiency').textContent = Math.round(state.simulatedValues.waterEfficiency) + '%';
        }

        function updateProduction() {
            const variation = (Math.random() * 2 - 1) * 2;
            state.simulatedValues.production += variation;
            
            state.simulatedValues.production = Math.max(0, state.simulatedValues.production);
            
            document.getElementById('monthly-production').textContent = Math.round(state.simulatedValues.production);
        }

        // Actualizar datos del gráfico
        function updateChartData(type, value) {
            const now = new Date();
            const timeLabel = now.getHours().toString().padStart(2, '0') + ':' +
                              now.getMinutes().toString().padStart(2, '0');
            
            state.historicalData[type].push({
                x: timeLabel,
                y: value
            });
            
            if (state.historicalData[type].length > 15) {
                state.historicalData[type].shift();
            }
            
            updateChart();
        }

        // Actualizar gráfico de pH y EC
        function updateChart() {
            const labels = state.historicalData.ph.map(item => item.x);
            
            state.phEcChart.data.labels = labels;
            state.phEcChart.data.datasets[0].data = state.historicalData.ph.map(item => item.y);
            state.phEcChart.data.datasets[1].data = state.historicalData.ec.map(item => item.y);
            
            state.phEcChart.update();
        }