const userData = [
  ["John Doe", "john@example.com", "(123) 456-7890"],
  ["Jane Smith", "jane@example.com", "(987) 654-3210"],
];

const grid = new gridjs.Grid({
  columns: ["Name", "Email", "Phone"],
  data: userData,
  sort: true,
  pagination: {
    enabled: true,
    limit: 5,
  },
  search: true,
});

grid.render(document.getElementById("grid"));

const filterInput = document.getElementById("filterInput");
const columnFilter = document.getElementById("columnFilter");

filterInput.addEventListener("input", (e) => {
  const value = e.target.value;
  const column = columnFilter.value;

  const filteredData = userData.filter((row) => {
    if (column === "all") {
      return row.some((cell) =>
        cell.toLowerCase().includes(value.toLowerCase())
      );
    }

    const columnIndex = {
      name: 0,
      email: 1,
      phone: 2,
    }[column];

    return row[columnIndex].toLowerCase().includes(value.toLowerCase());
  });

  grid
    .updateConfig({
      data: filteredData,
    })
    .forceRender();
});
