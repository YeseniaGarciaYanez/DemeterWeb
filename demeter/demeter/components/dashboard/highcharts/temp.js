Highcharts.chart('temp', {
    chart: {
        type: 'columnrange',
        inverted: true
    },

    accessibility: {
        description: 'Gráfico de rango de temperaturas semanales mostrando las temperaturas mínimas y máximas para cada día de la semana.'
    },

    title: {
        text: 'Temperatura Semanal'
    },

    subtitle: {
        text: 'Rango de temperaturas por día de la semana'
    },

    xAxis: {
        categories: [
            'Lunes', 'Martes', 'Miércoles', 'Jueves', 
            'Viernes', 'Sábado', 'Domingo'
        ]
    },

    yAxis: {
        title: {
            text: 'Temperatura (°C)'
        }
    },

    tooltip: {
        valueSuffix: '°C',
        headerFormat: '<b>{point.x}</b><br/>'
    },

    plotOptions: {
        columnrange: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true,
                format: '{y}°C',
                inside: true,
                style: {
                    color: '#333333',
                    textOutline: 'none'
                }
            },
            colorByPoint: true,
            colors: [
                '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', 
                '#8085e9', '#f15c80', '#e4d354'
            ]
        }
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Temperaturas',
        data: [
            [12, 24],   // Lunes (min, max)
            [14, 26],   // Martes
            [15, 28],   // Miércoles
            [16, 30],   // Jueves
            [18, 32],   // Viernes
            [20, 29],   // Sábado
            [18, 27]    // Domingo
        ]
    }]
});