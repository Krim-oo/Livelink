// ============================
// 1️⃣ Définition des colonnes et options AG Grid
// ============================
let gridApiFull;

const columnDefs = [
  { field: "course_id", headerName: "Course ID", editable: false },
  { field: "title", headerName: "Title", editable: true },
  {
    field: "description",
    headerName: "Description",
    editable: true,
    cellEditor: "agLargeTextCellEditor",
    cellEditorPopup: true,
  },
  {
    field: "type",
    headerName: "Type",
    editable: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: ["online", "offline", "hybrid"] },
  },
  { field: "icon", headerName: "Icon", editable: true },
  { field: "duration", headerName: "Duration", editable: false },
  {
    field: "link",
    headerName: "Link",
    editable: false,
    cellRenderer: (params) =>
      `<a href="https://example.com/${params.value}" target="_blank">${params.value}</a>`,
  },
];

const gridOptionsFullEdit = {
  rowData: [],
  columnDefs: columnDefs,
  defaultColDef: {
    filter: "agTextColumnFilter",
    sortable: true,
  },
  pagination: true,
  onCellValueChanged: (event) => {
    console.log(
      "Cellule modifiée :",
      event.colDef.field,
      "Nouvelle valeur :",
      event.newValue
    );
  },
};

// ============================
// 2️⃣ Initialisation de la grille AG Grid
// ============================
function initGrid() {
  const gridFullEdit = document.querySelector("#gridFullEdit");
  gridApiFull = agGrid.createGrid(gridFullEdit, gridOptionsFullEdit);
}

// ============================
// 3️⃣ Gestion des événements utilisateur
// ============================

// Filtrage des données dans la grille
function onFilterTextBoxChanged() {
  gridApiFull.setGridOption(
    "quickFilterText",
    document.getElementById("filter-text-box").value
  );
}

// Gestion de l'ouverture et fermeture du drawer
function initDrawerHandlers() {
  const drawer = document.querySelector(".drawer-overview");
  const openButton = document.querySelector(
    "sl-button-group sl-button:first-child"
  );
  const closeButton = document.getElementById("close-drawer");

  if (drawer && openButton && closeButton) {
    openButton.addEventListener("click", () => drawer.show());
    closeButton.addEventListener("click", () => drawer.hide());
  } else {
    console.error(
      "Erreur : Impossible d'initialiser les événements du drawer."
    );
  }
}

// ============================
// 4️⃣ Chargement des données depuis un fichier JSON
// ============================
function loadInitialData() {
  fetch("../fictitious_courses.json")
    .then((response) => response.json())
    .then((data) => {
      gridApiFull.setGridOption("rowData", data);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des données :", error)
    );
}

// ============================
// 5️⃣ Ajout d'un nouveau cours via le formulaire
// ============================

function initFormHandler() {
  const submitButton = document.getElementById("submit-course");
  const form = document.getElementById("course-form");
  const drawer = document.querySelector(".drawer-overview");

  if (!submitButton || !form || !drawer) {
    console.error("Erreur : Impossible d'initialiser le formulaire.");
    return;
  }

  submitButton.addEventListener("click", () => {
    // Récupération des valeurs du formulaire
    const courseData = {
      course_id: form
        .querySelector('sl-input[label="ID du cours"]')
        .value.trim(),
      title: form
        .querySelector('sl-input[label="Titre du cours"]')
        .value.trim(),
      description: form
        .querySelector('sl-textarea[label="Description"]')
        .value.trim(),
      type: form.querySelector('sl-select[label="Type"]').value.trim(),
      icon: form.querySelector('sl-input[label="Icône"]').value.trim(),
      duration: form.querySelector('sl-input[label="Durée"]').value.trim(),
      link: form.querySelector('sl-input[label="Lien"]').value.trim(),
    };

    // Vérifier si tous les champs sont remplis
    if (!Object.values(courseData).every((value) => value)) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    console.log("Cours ajouté :", courseData);

    // Vérifier que gridApiFull est bien défini
    if (gridApiFull) {
      const res = gridApiFull.applyTransaction({ add: [courseData] });
      console.log("Résultat de l'ajout :", res);
    } else {
      console.error("Erreur : gridApiFull n'est pas défini !");
    }

    alert("Cours ajouté avec succès !");
    drawer.hide();
    form.reset();
  });
}

// ============================
// 🔹 Initialisation globale après chargement du DOM
// ============================
document.addEventListener("DOMContentLoaded", () => {
  initGrid();
  initDrawerHandlers();
  loadInitialData();
  initFormHandler();
});
