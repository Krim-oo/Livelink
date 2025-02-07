let courses = []; // Variable pour stocker les données des cours
let grid; // Variable pour stocker l'instance Grid.js

// Fonction pour charger les données depuis le fichier JSON
async function loadCourses() {
  try {
    const response = await fetch("../course_catalog.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    const data = await response.json();
    courses = data.courses; // Stocker les cours dans la variable globale
    return data.courses;
  } catch (error) {
    console.error("Erreur lors du chargement du fichier JSON:", error);
  }
}

// Fonction pour initialiser le tableau Grid.js
function initGrid() {
  grid = new gridjs.Grid({
    columns: [
      {
        id: "icon",
        name: "Icon",
        formatter: (cell) =>
          gridjs.html(`<img src="${cell}" alt="icon" width="30">`),
      },
      { id: "course_id", name: "Course ID" },
      { id: "title", name: "Title" },
      { id: "description", name: "Description" },
      { id: "type", name: "Type" },
      { id: "duration", name: "Duration" },
      {
        id: "link",
        name: "Action",
        formatter: (cell, row) =>
          gridjs.html(
            `<a href="#" class="open-drawer" 
              data-id="${row.cells[1].data}" 
              data-title="${row.cells[2].data}" 
              data-description="${row.cells[3].data}" 
              data-type="${row.cells[4].data}" 
              data-duration="${row.cells[5].data}">
              Edit
            </a>`
          ),
      },
    ],
    data: courses.map((course) => ({
      icon: course.icon,
      course_id: course.course_id,
      title: course.title,
      description: course.description,
      type: course.type,
      duration: course.duration,
      link: course.link,
    })),
    pagination: {
      enabled: true,
      limit: 2,
    },
    search: true,
    sort: true,
  }).render(document.getElementById("table"));
}

// Gérer l'ouverture du drawer et les événements du formulaire
function handleDrawerClicks() {
  const form = document.getElementById("course-form");
  const drawer = document.querySelector(".drawer-overview");
  const dsRequestData = document.querySelector('input[name="DSrequestData"]');

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("open-drawer")) {
      event.preventDefault();

      // Récupérer les données depuis les attributs data-*
      const courseId = event.target.getAttribute("data-id");
      const courseTitle = event.target.getAttribute("data-title");
      const courseDescription = event.target.getAttribute("data-description");
      const courseType = event.target.getAttribute("data-type");
      const courseDuration = event.target.getAttribute("data-duration");

      // Pré-remplir le formulaire avec les données du cours
      form.querySelector('[name="course_id"]').value = courseId;
      form.querySelector('[name="title"]').value = courseTitle;
      form.querySelector('[name="description"]').value = courseDescription;
      form.querySelector('[name="type"]').value = courseType;
      form.querySelector('[name="duration"]').value = courseDuration;

      // Afficher le drawer
      drawer.show();
    }
  });

  // Gérer la soumission du formulaire
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupérer les données modifiées du formulaire
    const updatedData = {
      course_id: form.querySelector('[name="course_id"]').value,
      title: form.querySelector('[name="title"]').value,
      description: form.querySelector('[name="description"]').value,
      type: form.querySelector('[name="type"]').value,
      duration: form.querySelector('[name="duration"]').value,
    };

    // Mettre à jour les données dans la liste des cours
    const courseIndex = courses.findIndex(
      (course) => course.course_id === updatedData.course_id
    );
    if (courseIndex !== -1) {
      courses[courseIndex] = { ...courses[courseIndex], ...updatedData };
    }

    dsRequestData.value = JSON.stringify(updatedData);
    console.log(dsRequestData.value);

    // Rafraîchir la grille
    grid
      .updateConfig({
        data: courses.map((course) => ({
          icon: course.icon,
          course_id: course.course_id,
          title: course.title,
          description: course.description,
          type: course.type,
          duration: course.duration,
          link: course.link,
        })),
      })
      .forceRender();

    console.log("Données sauvegardées :", updatedData);

    // Fermer le drawer
    drawer.hide();
  });
}

// Initialiser l'application
async function initApp() {
  const data = await loadCourses();
  if (data) {
    initGrid();
    handleDrawerClicks();
  }
}

// Lancer l'application
initApp();
