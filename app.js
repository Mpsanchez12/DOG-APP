// ===================================
// Dog App - Script principal (FINAL OPTIMIZADO) 🐶
// ===================================

// URL de la API de perritos 🐾
const API_URL = "https://api.thedogapi.com/v1/images/search?limit=12";

// ===========================
// Consejos del perrito 🐕 (Versión Final)
// ===========================
const consejosPerrito = [
    "Mientras el mundo se estresa, hay alguien que siempre te espera impaciente para curarte de todo mal. Soy yo. ❤️",
    "No te compliques: el amor se demuestra moviendo la cola y pidiendo caricias. Funciona siempre. 🤗",
    "Tu mejor atuendo es una sonrisa, pero tu mejor complemento es mi pelo pegado a tu ropa. 🐕",
    "La felicidad se puede medir en la cantidad de veces que se agita una cola. Sé feliz. ✨",
    "No te preocupes por el futuro. Concéntrate en la pelota que tienes ahora. 🎾",
    "Recuerda que tu única posesión real es el tiempo que pasas con los que amas. 🏡",
    "Da la bienvenida a cada nuevo día con la misma euforia que a la hora de comer. 🥳",
    "Si algo huele mal, ¡rómpelo! (No, espera, eso solo lo hago yo. Tú ignora ese consejo). 💩",
    "No existe problema tan grande que no se pueda solucionar con un buen mordisco a tu zapato. (¡Oops!). 🤫",
    "Si tienes dudas, siempre ladra. Siempre. 🗣️" 
];

// ==================================================
// Mostrar una vista y ocultar las demás (FUNCIÓN PRINCIPAL)
// ==================================================
function mostrarVista(vistaId) {
    const vistas = document.querySelectorAll("section");
    
    // 1. Ocultar todas las secciones
    vistas.forEach(v => v.style.display = "none");

    // 2. Mostrar la sección activa con el display correcto
    const vistaActiva = document.getElementById(vistaId);
    if (vistaActiva) {
        // Usa 'flex' para las vistas que necesitan centrado (inicio y detalle)
        if (vistaId === 'inicio' || vistaId === 'detalle') {
            vistaActiva.style.display = "flex";
        } else {
            vistaActiva.style.display = "block";
        }
    }

    // 3. Cargar datos si es necesario
    if (vistaId === "listado") cargarPerros(); 
    if (vistaId === "coleccion") mostrarColeccion();

    // 4. Cierra el menú hamburguesa si está abierto (Lógica RESPONSIVE)
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');

    if (nav && toggle && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
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

        contenedor.innerHTML = ""; 

        data.forEach(perro => {
            const div = document.createElement("div");
            div.classList.add("card-perro");

            const imageUrl = perro.url || (perro.image && perro.image.url); 

            div.innerHTML = `
                <img src="${imageUrl}" alt="Perrito adorable">
                <div class="acciones-card">
                    <button class="btn-detalle" onclick="mostrarDetalle('${imageUrl}')">
                        Ver consejo
                    </button>
                    <button class="btn-favorito" onclick="agregarAFavoritos('${imageUrl}', this)"> 
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
// Mostrar detalle del perro
// ===========================
function mostrarDetalle(url) {
    const consejoAleatorio = consejosPerrito[Math.floor(Math.random() * consejosPerrito.length)];
    const contenedor = document.getElementById("detalle-perro");

    contenedor.innerHTML = `
        <img src="${url}" class="detalle-img" alt="Perrito adorable">
        <p class="mensaje-perro">🐶 ${consejoAleatorio}</p>
        <button class="btn-favorito" onclick="agregarAFavoritos('${url}', this)">
            💖 Añadir a Colección
        </button>
    `;

    mostrarVista("detalle");
}

// ===========================
// Guardar en colección (MEJORADO con Feedback Visual)
// ===========================
function agregarAFavoritos(imagen, btnElement) { 
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.some(perro => perro.image === imagen)) {
        favoritos.push({ image: imagen });
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        
        // **DINAMISMO:** Feedback visual en el botón
        if (btnElement) {
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = "✅ ¡Añadido!";
            btnElement.style.backgroundColor = '#4CAF50'; 
            btnElement.style.color = 'white';
            btnElement.style.boxShadow = '0 6px 0 #388E3C, 0 8px 15px rgba(0, 0, 0, 0.2)';
            btnElement.style.transform = 'translateY(-2px)'; // Pequeño movimiento de confirmación

            // Revertir el estado visual después de 1.5 segundos
            setTimeout(() => {
                btnElement.innerHTML = originalText;
                // Eliminar los estilos inyectados para que el CSS tome el control nuevamente
                btnElement.removeAttribute('style'); 
            }, 1500);
        }
    } else {
        // **MEJORA:** Usamos un pequeño feedback en la consola o un alert, si no se quiere feedback en el DOM.
        // Mantenemos el alert por simplicidad, pero se recomienda un modal o toast para mejor estética.
        alert("⚠️ Este perrito ya está en tu colección.");
    }
}

// ===========================
// Mostrar colección
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
    if (confirm("¿Estás seguro de que quieres vaciar toda tu colección de perritos?")) {
        localStorage.removeItem("favoritos");
        mostrarColeccion();
    }
}

// ====================================
// Función del Menú Hamburguesa
// ====================================
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');
    
    // Alterna la clase 'active' para mostrar/ocultar el menú y transformar el icono
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active'); 
    }
}

// ===========================
// Inicialización y Utilidades
// ===========================

// Función auxiliar para el botón "Ver perros" en la vista de inicio
function mostrarListado() {
    mostrarVista("listado");
}

// Inicia la aplicación en la vista de inicio
document.addEventListener("DOMContentLoaded", () => {
    mostrarVista("inicio"); 
});