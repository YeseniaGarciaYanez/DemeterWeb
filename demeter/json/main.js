import { api, simulators } from './services';
import { initializeCharts, updateCharts } from './charts';

// Configuración inicial
const CROP_ID = 1; // ID del cultivo principal a monitorear
const UPDATE_INTERVAL = 10000; // 10 segundos para actualizaciones
let dataUpdateInterval = null;

// Elementos del DOM
const elements = {
    temperature: document.getElementById('temperature-value'),
    ph: document.getElementById('ph-value'),
    ec: document.getElementById('ec-value'),
    humidity: document.getElementById('humidity-value'),
    waterEfficiency: document.getElementById('water-efficiency'),
    production: document.getElementById('monthly-production'),
    startBtn: document.getElementById('button-start'),
    stopBtn: document.getElementById('button-stop'),
    connectionStatus: document.querySelector('.connection-status')
};

// Estado de la aplicación
let appState = {
    online: true,
    lastUpdate: new Date()
};

// Inicialización de la aplicación
async function init() {
    checkAuth();
    setupEventListeners();
    await loadInitialData();
    startDataUpdates();
}

// Verificar autenticación
function checkAuth() {
    const token = localStorage.getItem('token');
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!token && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (token && isLoginPage) {
        window.location.href = 'index.html';
    }
}

// Configurar event listeners
function setupEventListeners() {
    if (elements.startBtn && elements.stopBtn) {
        elements.startBtn.addEventListener('click', startDataUpdates);
        elements.stopBtn.addEventListener('click', stopDataUpdates);
    }
    
    // Configurar login si estamos en esa página
    if (window.location.pathname.includes('login.html')) {
        document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    }
}

// Manejar login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await api.login(email, password);
        if (response?.token) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('Error en el login: ' + error.message);
    }
}

// Cargar datos iniciales
async function loadInitialData() {
    try {
        // Cargar datos de sensores
        const [tempData, phData, ecData, humData, efficiencyData, productionData] = await Promise.all([
            api.getTemperatureData(CROP_ID),
            api.getPHData(CROP_ID),
            api.getECData(CROP_ID),
            api.getHumidityData(CROP_ID),
            api.getWaterEfficiency(CROP_ID),
            api.getProductionData(CROP_ID)
        ]);
        
        // Actualizar UI
        updateUI({
            temperature: tempData.value,
            ph: phData.value,
            ec: ecData.value,
            humidity: humData.value,
            waterEfficiency: efficiencyData.value,
            production: productionData.value
        });
        
        // Cargar datos históricos para gráficas
        const historicalData = await api.getPHData(CROP_ID, 24);
        initializeCharts(historicalData);
        
        appState.online = true;
        updateConnectionStatus();
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        appState.online = false;
        updateConnectionStatus();
        simulators.startAll();
    }
}

// Iniciar actualizaciones periódicas
function startDataUpdates() {
    if (dataUpdateInterval) clearInterval(dataUpdateInterval);
    
    dataUpdateInterval = setInterval(async () => {
        try {
            const [tempData, phData, ecData, humData] = await Promise.all([
                api.getTemperatureData(CROP_ID, 1), // Última hora
                api.getPHData(CROP_ID, 1),
                api.getECData(CROP_ID, 1),
                api.getHumidityData(CROP_ID, 1)
            ]);
            
            updateUI({
                temperature: tempData.value,
                ph: phData.value,
                ec: ecData.value,
                humidity: humData.value
            });
            
            updateCharts(phData.value, ecData.value);
            
            appState.online = true;
            appState.lastUpdate = new Date();
            updateConnectionStatus();
        } catch (error) {
            console.error('Error en actualización:', error);
            appState.online = false;
            updateConnectionStatus();
        }
    }, UPDATE_INTERVAL);
}

// Detener actualizaciones
function stopDataUpdates() {
    if (dataUpdateInterval) {
        clearInterval(dataUpdateInterval);
        dataUpdateInterval = null;
        simulators.stopAll();
    }
}

// Actualizar la interfaz de usuario
function updateUI(data) {
    if (data.temperature) {
        elements.temperature.textContent = `${data.temperature.toFixed(1)}°C`;
    }
    if (data.ph) {
        elements.ph.textContent = data.ph.toFixed(1);
    }
    if (data.ec) {
        elements.ec.textContent = `${data.ec.toFixed(1)} mS/cm`;
    }
    if (data.humidity) {
        elements.humidity.textContent = `${Math.round(data.humidity)}%`;
    }
    if (data.waterEfficiency) {
        elements.waterEfficiency.textContent = `${Math.round(data.waterEfficiency)}%`;
    }
    if (data.production) {
        elements.production.textContent = Math.round(data.production);
    }
}

// Actualizar estado de conexión
function updateConnectionStatus() {
    if (elements.connectionStatus) {
        if (appState.online) {
            elements.connectionStatus.textContent = `Última actualización: ${appState.lastUpdate.toLocaleTimeString()}`;
            elements.connectionStatus.style.color = '#27ae60';
        } else {
            elements.connectionStatus.textContent = 'Conexión perdida - Datos almacenados localmente';
            elements.connectionStatus.style.color = '#e74c3c';
        }
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);