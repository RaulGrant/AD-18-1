const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

// Tarea 1, 2 y 3: Fetch, mostrar y guardar en localStorage
async function fetchColorsList() {
  try {
    const response = await fetch("https://reqres.in/api/unknown", {
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });
    const data = await response.json();
    const colors = data.data || [];
    // Guardar en localStorage
    localStorage.setItem("colors", JSON.stringify(colors));
    // Limpiar lista antes de agregar
    itemsContainer.innerHTML = "";
    colors.forEach(addItem);
  } catch (error) {
    console.error("Error al obtener colores:", error);
  }
}

// Tarea 4: Cargar colores desde localStorage
function loadColorsFromStorage() {
  const colorsRaw = localStorage.getItem("colors");
  if (colorsRaw && colorsRaw !== "undefined") {
    try {
      const colors = JSON.parse(colorsRaw);
      itemsContainer.innerHTML = "";
      colors.forEach(addItem);
    } catch (e) {
      console.error("Error al parsear colores desde localStorage:", e);
    }
  }
}

// Tarea 5: Botón borrar
const btnDelete = document.createElement("button");
btnDelete.textContent = "Borrar lista";
btnDelete.className = "btn btn-danger m-2";
btnDelete.onclick = () => {
  itemsContainer.innerHTML = "";
  localStorage.removeItem("colors");
};
document.querySelector(".container").prepend(btnDelete);

// Tarea 6: Botón cargar
const btnReload = document.createElement("button");
btnReload.textContent = "Cargar colores";
btnReload.className = "btn btn-primary m-2";
btnReload.onclick = fetchColorsList;
document.querySelector(".container").prepend(btnReload);

// Al cargar la página, intenta cargar desde storage
loadColorsFromStorage();