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
  addListnerForAll();
}

const myButton = document.querySelector(".button");
myButton.addEventListener("click", createTable);

// MIDDLE

// дополнительный обработчик кнопки RUN
function fillTable() {
  const getTr = document.getElementsByTagName("tr");
  for (let i = 0; i < getTr.length; i++) {
    const getTd = getTr[i].querySelectorAll("td");
    for (let j = 0; j < getTd.length; j++) {
      getTd[j].innerHTML = `${i + 1}${j + 1}`;
    }
  }
}

myButton.addEventListener("click", fillTable);

function addListnerForAll() {
  const td = document.getElementsByTagName("td");
  Array.from(td).forEach(
    (el) =>
      (el.onclick = function () {
        el.classList.toggle("colored");
      })
  );
}
