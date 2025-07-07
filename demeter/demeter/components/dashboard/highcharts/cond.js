Highcharts.chart('cond', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Conductividad del Agua'
    },
    subtitle: {
        text: 'Mediciones en diferentes puntos de muestreo'
    },
    xAxis: {
        categories: ['Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 5'],
        title: {
            text: 'Puntos de medición'
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Conductividad (µS/cm)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' µS/cm'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true,
                format: '{y} µS/cm'
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: 'var(--highcharts-background-color, #ffffff)',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Mañana',
        data: [450, 620, 380, 550, 490],
        color: '#4CAF50'  // Verde para mañana
    }, {
        name: 'Tarde',
        data: [480, 650, 420, 580, 520],
        color: '#2196F3'  // Azul para tarde
    }, {
        name: 'Noche',
        data: [430, 600, 400, 530, 470],
        color: '#673AB7'  // Morado para noche
    }]
});