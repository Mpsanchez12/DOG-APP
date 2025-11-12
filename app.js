// ===========================
// Dog App - Script principal 🐶
// ===========================

// URL de la API de perritos 🐾
const API_URL = "https://api.thedogapi.com/v1/images/search?limit=12";

// ===========================
// Mostrar una vista y ocultar las demás
// ===========================
function mostrarVista(vistaId) {
    const vistas = document.querySelectorAll("section");
    vistas.forEach(v => v.style.display = "none");

    const vistaActiva = document.getElementById(vistaId);
    if (vistaActiva) vistaActiva.style.display = "block";

    // Si se entra en el listado, cargar los perros.
    if (vistaId === "listado") cargarPerros(); 

    // Si se entra en la vista de colección, cargarla.
    if (vistaId === "coleccion") mostrarColeccion();
}

// ===========================
// Función para cargar perros desde la API
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
                <div class="acciones-card">
                    <button class="btn-detalle" onclick="mostrarDetalle('${perro.url}')">
                         Ver consejo
                    </button>
                    <button class="btn-favorito" onclick="agregarAFavoritos('${perro.url}')">
                        💖 Añadir
                    </button>
                </div>
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
        <img src="${url}" class="detalle-img" alt="Perrito adorable">
        <p class="mensaje-perro">🐶 ${consejoAleatorio}</p>
        <button class="btn-favorito" onclick="agregarAFavoritos('${url}')">
            💖 Añadir a Colección
        </button>
    `;

    mostrarVista("detalle");
}

// ===========================
// Guardar en colección
// ===========================
function agregarAFavoritos(imagen) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.some(perro => perro.image === imagen)) {
        favoritos.push({ image: imagen });
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("🐾 ¡Perrito añadido a tu colección!");
    } else {
        alert("⚠️ Este perrito ya está en tu colección.");
    }
}

// ===========================
// Mostrar colección (Estructura Corregida)
// ===========================
function mostrarColeccion() {
    const contenedor = document.getElementById("contenedor-favoritos");
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    contenedor.innerHTML = "";

    if (favoritos.length === 0) {
        contenedor.innerHTML = "<p>No tienes perritos en tu colección aún 🐕</p>";
        return;
    }

    favoritos.forEach(perro => {
        const div = document.createElement("div");
        div.classList.add("card-perro");

        div.innerHTML = `
            <div class="card-imagen-contenedor">
                <img src="${perro.image}" alt="Perrito favorito">
            </div>
            <div class="acciones-card">
                <button class="btn-detalle" onclick="mostrarDetalle('${perro.image}')">💡 Ver consejo</button>
                <button class="btn-eliminar" onclick="eliminarDeColeccion('${perro.image}')">🗑️ Quitar</button>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

// ===========================
// Eliminar un perrito de la colección
// ===========================
function eliminarDeColeccion(imagen) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(perro => perro.image !== imagen);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarColeccion();
}

// ===========================
// Vaciar toda la colección
// ===========================
function limpiarColeccion() {
    localStorage.removeItem("favoritos");
    mostrarColeccion();
}

// ===========================
// Inicialización
// ===========================
function mostrarListado() {
    mostrarVista("listado");
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarVista("inicio"); // Vista inicial
});