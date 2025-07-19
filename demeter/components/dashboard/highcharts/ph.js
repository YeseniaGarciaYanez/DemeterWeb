const gaugeOptions = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: 'var(--highcharts-neutral-color-3, #fafafa)',
            borderColor: 'var(--highcharts-neutral-color-20, #ccc)',
            borderRadius: 5,
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#DF5353'], // rojo (ácido fuerte)
            [0.3, '#FF9999'], // rosa (ácido moderado)
            [0.5, '#DDDF0D'], // amarillo (ácido débil)
            [0.6, '#55BF3B'], // verde (neutro)
            [0.7, '#DDDF0D'], // amarillo (básico débil)
            [0.9, '#2b908f']  // azul (básico fuerte)
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            borderRadius: 3,
            dataLabels: {
                y: 5,
                borderWidth: 0
            }
        }
    }
};

// El medidor de pH principal
const chartPH = Highcharts.chart(
    'container-speed', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 14,
            title: {
                text: ''
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'pH',
            data: [7],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">Nivel de pH</span>' +
                '</div>'
            },
            tooltip: {
                valueSuffix: ' pH'
            }
        }]
    }));

// El segundo medidor (podría ser para temperatura u otro parámetro)
const chartAux = Highcharts.chart(
    'container-rpm', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Temp'
            }
        },

        series: [{
            name: 'Temperatura',
            data: [25],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y:.1f}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">' +
                '°C' +
                '</span>' +
                '</div>'
            },
            tooltip: {
                valueSuffix: ' °C'
            }
        }]
    }));

// Simulación de cambios
setInterval(function () {
    // pH
    let point, newVal, inc;
    
    if (chartPH) {
        point = chartPH.series[0].points[0];
        inc = (Math.random() - 0.5) * 0.5; // Cambios más pequeños
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 14) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }

    // Temperatura
    if (chartAux) {
        point = chartAux.series[0].points[0];
        inc = (Math.random() - 0.5) * 2;
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 100) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }
}, 2000);