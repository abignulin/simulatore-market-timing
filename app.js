// Codice per il simulatore
const ctx = document.getElementById('marketChart').getContext('2d');

const marketData = {
  labels: ['Inizio', 'Anno 1', 'Anno 2', 'Anno 3', 'Anno 4', 'Fine'],
  datasets: [{
    label: 'Andamento del mercato',
    data: [100, 110, 120, 130, 125, 150],  // Dati esempio
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    fill: true
  }]
};

const chart = new Chart(ctx, {
  type: 'line',
  data: marketData,
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  }
});

let buyAmount = 0;
let buyTime = 0;
let totalInvested = 0;
let totalValue = 100;  // Valore iniziale del mercato

document.getElementById('buyButton').addEventListener('click', function() {
  const amount = parseFloat(document.getElementById('amount').value);
  if (!isNaN(amount) && amount > 0) {
    buyAmount = amount;
    buyTime = chart.data.labels.length - 1;  // Quando è stato acquistato
    totalInvested += buyAmount;
    console.log('Acquistato:', buyAmount, '€');
  } else {
    alert("Inserisci un importo valido.");
  }
});

document.getElementById('sellButton').addEventListener('click', function() {
  if (buyAmount > 0) {
    const finalValue = totalInvested * (chart.data.datasets[0].data[chart.data.labels.length - 1] / 100);
    totalValue += finalValue;
    document.getElementById('finalComparison').innerText = `Valore finale con Market Timing: €${totalValue.toFixed(2)}`;
    buyAmount = 0;  // Reset after selling
  } else {
    alert("Non hai acquistato ancora.");
  }
});
