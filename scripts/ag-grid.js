let gridApiFull;
let gridApiRow;

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

// Options pour le mode édition complète
const gridOptionsFullEdit = {
  rowData: [],
  columnDefs: columnDefs,
  defaultColDef: {
    filter: "agTextColumnFilter",
    sortable: true,
  },
  pagination: true,
  onCellValueChanged: (event) => {
    console.log(event);
    console.log(event.newValue);
    console.log(event.node.sourceRowIndex);
    console.log(event.colDef.field);
  },
};

// Options pour le mode édition par ligne
const gridOptionsRowEdit = {
  rowData: [],
  columnDefs: columnDefs,
  defaultColDef: {
    filter: "agTextColumnFilter",
    floatingFilter: false,
    sortable: true,
  },
  rowSelection: {
    mode: "singleRow",
  },
  pagination: true,
};

const gridFullEdit = document.querySelector("#gridFullEdit");
const gridRowEdit = document.querySelector("#gridRowEdit");
gridApiFull = agGrid.createGrid(gridFullEdit, gridOptionsFullEdit);
gridApiRow = agGrid.createGrid(gridRowEdit, gridOptionsRowEdit);

// Fetch Remote Data
fetch("../fictitious_courses.json")
  .then((response) => response.json())
  .then((data) => {
    gridApiFull.setGridOption("rowData", data);
    gridApiRow.setGridOption("rowData", data);
  });
