// ADVANCED

function createTable() {
  const tableGrid = document.querySelector(".table-grid");
  tableGrid.innerHTML = "";
  const table = document.createElement("table");
  table.className = "table";
  const rowValue = document.querySelector("#row-count").value;
  const columnValue = document.querySelector("#column-count").value;

  // Валидация на пустую строку + в html на ввод положительных значений
  if (rowValue === "" || columnValue === "") {
    alert("you must specify the number of rows and columns");
    return false;
  }

  for (let i = 0; i < rowValue; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columnValue; j++) {
      const td = document.createElement("td");
      tr.append(td);
      // оптимизация кода
      td.innerHTML = `${i + 1}${j + 1}`;
    }
    table.append(tr);
  }

  tableGrid.append(table);

  // Делегирование:
  table.onclick = function (event) {
    let target = event.target;
    if (target.tagName != "TD") {
      return;
    } else {
      target.classList.toggle("colored");
    }
  };
}

const myButton = document.querySelector(".button");
myButton.addEventListener("click", createTable);
