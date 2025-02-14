// Initialisation de FilePond
const pond = FilePond.create(document.getElementById("fileUpload"), {
  acceptedFileTypes: ["text/csv"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      resolve(type);
    }),
});

// Fonction pour parser un fichier CSV
function parseCSV(text) {
  const lines = text.split("\n");
  const labels = lines[0].split(",").map((label) => label.trim());
  const data = lines[1].split(",").map((value) => parseFloat(value.trim()));
  return [labels, data];
}

// Fonction pour mettre à jour le graphique
function updateChart(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const chartType = document.getElementById("chartType").value;
  const backgroundColor = document.getElementById("backgroundColor").value;
  const borderColor = document.getElementById("borderColor").value;
  const borderWidth = parseFloat(document.getElementById("borderWidth").value);

  // Détruire le graphique existant s'il existe
  if (window.myChart && typeof window.myChart.destroy === "function") {
    window.myChart.destroy();
  }

  // Créer un nouveau graphique
  window.myChart = new Chart(ctx, {
    type: chartType, // Type de graphique sélectionné
    data: {
      labels: labels,
      datasets: [
        {
          label: "Données",
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ],
    },
    options: {
      responsive: true,
      scales:
        chartType === "pie" || chartType === "doughnut"
          ? {}
          : {
              y: {
                beginAtZero: true,
              },
            },
    },
  });
}

// Gestion du formulaire
document.getElementById("chartForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Récupérer le fichier avec FilePond
  const file = pond.getFile();
  if (!file) {
    alert("Veuillez téléverser un fichier CSV.");
    return;
  }

  // Lire le fichier CSV et extraire les données
  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    const [labels, data] = parseCSV(text);
    updateChart(labels, data);
  };
  reader.readAsText(file.file);
});
