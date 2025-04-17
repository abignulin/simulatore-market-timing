// Codice per il simulatore
const ctx = document.getElementById('marketChart').getContext('2d');

// Inizializza i dati del mercato con valori in crescita progressiva
const marketData = {
  labels: ['Inizio'],
  datasets: [{
    label: 'Andamento del mercato',
    data: [100],  // Partiamo da 100 come valore iniziale
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

// Funzione per simulare l'andamento del mercato
function simulateMarketGrowth() {
  // Aggiungi un nuovo punto ai dati del grafico
  const lastValue = marketData.datasets[0].data[marketData.datasets[0].data.length - 1];
  const newValue = lastValue + (Math.random() * 5 + 1); // Aggiungi una crescita casuale
  const newLabel = `Anno ${marketData.labels.length}`;

  // Aggiungi i nuovi dati al grafico
  marketData.labels.push(newLabel);
  marketData.datasets[0].data.push(newValue);

  // Aggiorna il grafico
  chart.update();
}

// Avvia l'aggiornamento automatico del grafico ogni 3 secondi
setInterval(simulateMarketGrowth, 3000);

// Variabili per le operazioni di acquisto/vendita
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
    buyAmount = 0;  // Reset dopo la vendita
  } else {
    alert("Non hai acquistato ancora.");
  }
});
