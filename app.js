// URL de la API de perritos 🐾
const API_URL = "https://api.thedogapi.com/v1/images/search?limit=12";

// ===========================
// Consejos del perrito 🐕 (Tips de Programación)
// ===========================
const tipsProgramacion = [
    "Siempre usa 'let' o 'const' en lugar de 'var' en JavaScript.",
    "Un buen nombre de variable es crucial para la legibilidad del código.",
    "Utiliza la consola (console.log) para depurar el código de manera efectiva.",
    "Aprende Git: es indispensable para el trabajo en equipo y el control de versiones.",
    "Evita anidar más de 3-4 niveles de 'if'/'for' para mantener la limpieza.",
    "La recursividad no siempre es la solución más rápida, ¡piensa en la complejidad (Big O)!",
    "Funciones pequeñas y claras siempre son mejor que monstruos de 200 líneas.",
    "Documenta tu código: tu yo del futuro te lo agradecerá.",
    "Evita 'alert()' en producción; usa la consola o logs inteligentes.",
    "CSS no es magia, pero parece… entiende el flujo de box model y positioning.",
    "Usa semántica en HTML: <header>, <main>, <footer> no son decorativos.",
    "No abuses de !important en CSS: es la señal de que algo está mal estructurado.",
    "Aprende a usar 'fetch' y async/await: async es tu superpoder moderno.",
    "Divide y vencerás: componentes reutilizables facilitan el mantenimiento.",
    "Evita nombres genéricos como data, temp o thing.",
    "Siempre cierra tus etiquetas HTML; los navegadores perdonan, los compañeros no.",
    "El DOM no es magia; entiéndelo para depurar sin sufrir.",
    "Si tu código funciona a la primera, probablemente algo salió mal.",
    "Cada vez que ves un bug, imagina que el código está jugando contigo.",
    "Aprende y usa 'async/await' para manejar código asíncrono; es más limpio que las Promesas.",
    "Usa 'const' por defecto y solo cambia a 'let' si sabes que la variable necesita ser reasignada.",
    "Domina la desestructuración de objetos y arrays; simplifica mucho la extracción de datos.",
    "Utiliza los 'template literals' (`...`) para construir cadenas largas e inyectar variables fácilmente.",
    "Conoce bien los métodos de array: map, filter y reduce son más eficientes que un bucle for tradicional.",
    "Aplica el principio DRY (Don't Repeat Yourself): crea funciones para bloques de código que se repiten.",
    "Comprende el Event Loop de JS; es fundamental para entender cómo funciona la asincronía.",
    "Practica la programación orientada a objetos (POO) usando clases en ES6+ para estructurar tu JS.",
    "Utiliza Flexbox para alinear elementos en una dimensión (fila o columna). ¡Es más fácil que float!",
    "Aprende CSS Grid para layouts complejos de dos dimensiones (filas y columnas a la vez).",
    "Define variables CSS (--color-primario) para cambiar fácilmente los colores de tu tema.",
    "Establece 'box-sizing: border-box;' en todos los elementos para controlar el tamaño de forma predecible.",
    "Prioriza las unidades relativas como 'rem' para tipografía y 'vw'/'vh' para dimensiones de viewport.",
    "Usa los pseudo-selectores :nth-child() o :last-child para estilizar elementos específicos sin añadir clases.",
    "Evita usar píxeles (px) para fuentes en diseño responsivo; usa 'em' o 'rem' en su lugar.",
    "Siempre usa HTML semántico: <article>, <section>, <nav> y <aside> dan significado a tu contenido.",
    "Asegúrate de que tus etiquetas <label> estén asociadas a sus <input> mediante el atributo 'for'.",
    "Valida tu HTML; usa herramientas online para revisar que no tengas etiquetas mal cerradas o errores.",
    "El atributo 'alt' en las imágenes no es opcional: es crucial para la accesibilidad y el SEO.",
    "Usa el atributo 'data-' para almacenar pequeñas cantidades de datos personalizados en elementos HTML.",
    "Incluye siempre la etiqueta meta viewport para asegurar que tu diseño se adapte bien a móviles.",
    "Practica la anidación correcta: los <div> no deben ir dentro de <span> y los <p> no deben contener <div>.",
    "Mi código no tiene errores, solo comportamientos inesperados.",
    "Ctrl+Z es la función más poderosa de la vida moderna.",
    "Estoy convencido de que mi código se depura solo mientras duermo.",
    "Si no entendiste mi código, no es un bug, es un nivel de abstracción.",
    "Programar sin café es como HTML sin etiquetas: caótico.",
    "Nunca subestimes el poder de un buen comentario en medio de un caos de código.",
    "Si algo tarda más de un minuto en cargarse, añade un spinner y actúa como si estuviera optimizado.",
    "Cuando en duda, reinicia el servidor y espera que funcione.",
    "Si tu código tiene más de 300 líneas, probablemente necesitas vacaciones.",
    "Aprende a leer errores: la consola siempre te está dando pistas aunque finja que no.",
    "Una función que empieza con demasiadas variables probablemente necesite terapia.",
    "Todo código viejo que funciona es sospechoso y merece respeto y miedo.",
    "El código perfecto no existe, pero el código que funciona en producción sí es sagrado."
];


function mostrarVista(vistaId) {
    const vistas = document.querySelectorAll("section");
    
    
    vistas.forEach(v => v.style.display = "none");

    
    const vistaActiva = document.getElementById(vistaId);
    if (vistaActiva) {
        
        if (vistaId === 'inicio' || vistaId === 'detalle') {
            vistaActiva.style.display = "flex";
        } else {
            vistaActiva.style.display = "block";
        }
    }

    
    if (vistaId === "listado") cargarPerros(); 
    if (vistaId === "coleccion") mostrarColeccion(); 

    
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
    
    contenedor.innerHTML = `
        <p class="cargando-texto">
            Cargando perritos... <span class="patita-loader">🐾</span>
        </p>
    `;
    try {
        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();

        contenedor.innerHTML = ""; 

        data.forEach(perro => {
            const div = document.createElement("div");
            div.classList.add("card-perro");

            const imageUrl = perro.url || (perro.image && perro.image.url); 

            div.innerHTML = `
                <img src="${imageUrl}" 
                     alt="Perrito adorable"
                     onerror="this.onerror=null;this.src='imagenes/perro-default.png';"
                >
                <div class="acciones-card">
                    <button class="btn-detalle" onclick="mostrarDetalle('${imageUrl}')">
                        Ver consejo
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
    const consejoAleatorio = tipsProgramacion[Math.floor(Math.random() * tipsProgramacion.length)];
    const contenedor = document.getElementById("detalle-perro");
    
    const consejoEscapado = consejoAleatorio.replace(/'/g, "\\'"); 

    contenedor.innerHTML = `
        <img src="${url}" class="detalle-img" alt="Perrito adorable">
        <p class="mensaje-perro">🐶 ${consejoAleatorio}</p>
        
        <button class="btn-favorito" onclick="agregarAFavoritos('${url}', '${consejoEscapado}', this)">
            💖 Añadir a Colección
        </button>
    `;

    mostrarVista("detalle");
}

function agregarAFavoritos(imagen, consejoEscapado, btnElement) { 
    
    
    const consejo = consejoEscapado; 
    
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.some(perro => perro.image === imagen)) {
        
    
        favoritos.push({ 
            image: imagen,
            consejo: consejo 
        });
        
  
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        

        mostrarColeccion(); 
        
        
        if (btnElement) {
            const originalText = btnElement.innerHTML;
            
            btnElement.classList.add('agregado-exitoso');
            btnElement.innerHTML = "✅ ¡Añadido!";
            
            btnElement.disabled = true;

        
            setTimeout(() => {
                btnElement.classList.remove('agregado-exitoso');
                btnElement.innerHTML = originalText;
                btnElement.disabled = false;
            }, 1500);
        }
    } else {
        
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
        
        const consejoGuardado = perro.consejo || '💡 Tip no guardado';

        div.innerHTML = `
            <div class="card-imagen-contenedor">
                <img src="${perro.image}" alt="Perrito favorito">
            </div>
            
            <div class="consejo-coleccion">
                <p>💡 Tip guardado:</p>
                <p class="consejo-texto-guardado">${consejoGuardado}</p>
            </div>
            
            <div class="acciones-card">
                <button class="btn-detalle" onclick="mostrarDetalle('${perro.image}')">🔄 Ver otro tip</button>
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
    
    
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active'); 
    }
}

// ===========================
// Inicialización y Utilidades
// ===========================


function mostrarListado() {
    mostrarVista("listado");
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarVista("inicio"); 
});