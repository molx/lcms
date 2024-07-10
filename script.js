$(document).ready(function() {
    $.ajax({
        url: 'dados.json',
        dataType: 'json',
        success: function(data) {
            // Verifica se há mais de 50 leituras
            var startIndex = Math.max(0, data.dados.length - 50);
            var dadosToShow = data.dados.slice(startIndex);

            // Monta a tabela HTML
            var table = $('<table>').addClass('table');
            var header = '<thead><tr><th>Timestamp</th><th>Temperatura (ºC)</th><th>Pressão Atmosférica (hPa)</th></tr></thead>';
            table.append(header);
            var tbody = $('<tbody>');

            dadosToShow.forEach(function(item) {
                var row = '<tr>' +
                          '<td>' + item.timestamp + '</td>' +
                          '<td>' + item.temp + '</td>' +
                          '<td>' + item.atm + '</td>' +
                          '</tr>';
                tbody.append(row);
            });

            table.append(tbody);
            $('#tabela-container').append(table);

            // Cria o gráfico de temperatura
            criarGraficoTemp(dadosToShow);
        }
    });
});

function criarGraficoTemp(data) {
    var timestamps = data.map(function(item) {
        return item.timestamp;
    });
    var temperaturas = data.map(function(item) {
        return item.temp;
    });

    var ctx = document.getElementById('grafico-temp').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Temperatura (ºC)',
                data: temperaturas,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'minute'
                    },
                    distribution: 'linear',
                    ticks: {
                        source: 'auto'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
