// ===========================
// Dog App - Script principal
// ===========================

// URL de la API de perritos 🐶
const API_URL = "https://api.thedogapi.com/v1/images/search?limit=12";

// ===========================
// Mostrar una vista y ocultar las demás
// ===========================
function mostrarVista(vistaId) {
  const vistas = document.querySelectorAll("section");
  vistas.forEach(v => v.style.display = "none");

  const vistaActiva = document.getElementById(vistaId);
  if (vistaActiva) vistaActiva.style.display = "block";
}

// ===========================
// Función para cargar perros
// ===========================
async function cargarPerros() {
  const contenedor = document.getElementById("listado-perros");
  contenedor.innerHTML = "<p>Cargando perritos... 🐾</p>";

  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();

    contenedor.innerHTML = ""; // limpiar

    data.forEach(perro => {
      const div = document.createElement("div");
      div.classList.add("card-perro");

      div.innerHTML = `
        <img src="${perro.url}" alt="Perrito adorable">
        <button class="btn-detalle" onclick="mostrarDetalle('${perro.url}')">
          Ver detalle
        </button>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar perritos 😢</p>";
    console.error("Error:", error);
  }
}

// ===========================
// Consejos del perrito 🐕
// ===========================
const consejosPerrito = [
  "No olvides darme mimos 🐾",
  "Recuerda hidratarte, humano 💧",
  "Adoptar es un acto de amor ❤️",
  "Una siesta al día mantiene el mal humor lejos 😴",
  "Pasea 30 minutos al sol ☀️",
  "¡Sonríe! Te ves mejor así 😁",
  "Dame una galletita, me la merezco 🍪",
  "No trabajes tanto, juega un poco 🎾",
  "Si estás triste, yo te presto mi cola para moverla juntos 🐕",
  "Cada día es mejor con una sonrisa y un paseo 🦮"
];

// ===========================
// Mostrar detalle del perro
// ===========================
function mostrarDetalle(url) {
  const consejoAleatorio = consejosPerrito[Math.floor(Math.random() * consejosPerrito.length)];

  const contenedor = document.getElementById("detalle-perro");
  contenedor.innerHTML = `
    <img src="${url}" class="detalle-img" alt="perrito adorable">
    <p class="mensaje-perro">🐶 ${consejoAleatorio}</p>
  `;

  mostrarVista("detalle");
}

// ===========================
// Inicialización
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  cargarPerros();         // carga los perritos desde la API
  mostrarVista("inicio"); // muestra primero la pantalla de inicio
});

// ===========================
// Mostrar listado (para el botón de inicio)
// ===========================
function mostrarListado() {
  mostrarVista("listado");
  cargarPerros(); // 🔸 vuelve a cargar los perritos si se entra desde inicio
}
