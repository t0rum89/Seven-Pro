// LOW

function createTable() {
  const tableGrid = document.querySelector(".table-grid");
  tableGrid.innerHTML = "";
  const table = document.createElement("table");
  table.className = "table";
  const rowValue = document.querySelector("#row-count").value;
  const columnValue = document.querySelector("#column-count").value;

  for (let i = 0; i < rowValue; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columnValue; j++) {
      const td = document.createElement("td");
      tr.append(td);
    }
    table.append(tr);
  }

  tableGrid.append(table);
}

const myButton = document.querySelector(".button");
myButton.addEventListener("click", createTable);
