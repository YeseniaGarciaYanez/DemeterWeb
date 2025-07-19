Highcharts.chart('water', {
    title: {
        text: 'Niveles de Agua'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{xDescription}{separator}{value} metros'
        }
    },

    xAxis: {
        title: {
            text: 'Tiempo'
        },
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    },

    yAxis: {
        title: {
            text: 'Nivel (metros)'
        },
        min: 0,
        max: 10,
        tickInterval: 2,
        labels: {
            format: '{value} m'
        }
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br />',
        pointFormat: 'Nivel: {point.y} metros'
    },

    plotOptions: {
        series: {
            marker: {
                enabled: true,
                radius: 5
            }
        }
    },

    series: [{
        name: 'Nivel del agua',
        data: [3.2, 3.5, 4.1, 4.8, 5.5, 6.2, 6.8, 6.5, 5.9, 5.2, 4.3, 3.7],
        color: 'var(--highcharts-color-0, #2caffe)',
        lineWidth: 3,
        fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, 'rgba(44, 175, 254, 0.4)'],
                [1, 'rgba(44, 175, 254, 0.1)']
            ]
        }
    }]
});