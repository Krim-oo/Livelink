const DIV_GRID = "myGrid";
const GRID_DATA_URL = "https://www.ag-grid.com/example-assets/space-mission-data.json";
const GRID_DATA_FOLDER = 294761203;

// ============================
// 1️⃣ Définition des colonnes et options AG Grid
// ============================
let gridApiFull;


// config grid columns
const columnDefs = [
  { field: "uid", headerName: "Row ID", width: 0, editable: false },
  { field: "course_id", headerName: "Course ID", width: 120, editable: true },
  { field: "title", headerName: "Title", flex: 1, editable: true  },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "type", headerName: "Type", width: 0 },
  { 
    field: "icon", 
    headerName: "Icon", 
    width: 100,
    cellRenderer: params => `<img src="${params.value}" alt="icon" style="width:30px; height:30px;">`
  },
  { 
    field: "duration", 
    headerName: "Duration", 
    sortable: true 
  },
  { 
    field: "link", 
    headerName: "Link", 
    width: 150,
    cellRenderer: params => `<a href="./course/${params.value}" target="_blank">View Course</a>` 
  }
];




const gridOptions = {
  // Data to be displayed
  rowData: [],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    {
      field: "uid",
      width: 10,
    },
    {
      field: "course_id",
      width: 130,
    },
    {
      field: "title",
      width: 225,
    },
    {
      field: "description",
      width: 225,
    },
    {
      field: "type",
      width: 130,
    },
    {
      field: "icon",
      width: 120,
    },
  ],
  // Configurations applied to all columns
  defaultColDef: {
    filter: true,
    editable: true,
  },
  // Grid Options & Callbacks
  pagination: true,
  rowSelection: { mode: "multiRow", headerCheckbox: false },
  onSelectionChanged: (event) => {
    console.log("Row Selection Event!");
  },

  onCellValueChanged: (event) => {
    console.log(event.newValue);
    console.log(event.node.sourceRowIndex);
    console.log(event.colDef.field);
  },


};

window.DIV_GRID = DIV_GRID;
window.gridOptions = gridOptions;
window.columnDefs = columnDefs;
window.GRID_DATA_URL = GRID_DATA_URL;
window.GRID_DATA_FOLDER = GRID_DATA_FOLDER;
