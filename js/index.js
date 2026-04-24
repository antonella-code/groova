/* ========================================
   Estructura general:
   JS principal de Groova
   Funcionalidades: carrusel automatico,
   slider de reseñas, carrito de compras
   y filtros de productos
   ======================================== */

(function () {

/* ----------------------------------------
   Constantes
   ---------------------------------------- */

/* carrusel de productos */
const carousel = document.querySelector('.carousel');
const scrollAmount = 300;

/* slider de reseñas */
const citas = document.querySelectorAll('.reviews__quote');
const puntos = document.querySelectorAll('.reviews__dot');

/* Contador del carrito */
const contadorCarrito = document.querySelector('.header__cart-count');
const botonesCarrito = document.querySelectorAll('.product__cart');

/* filtros de la tienda */
const botonesFiltro = document.querySelectorAll('.filters__btn');
const productos = document.querySelectorAll('.store-grid .product');

/* ----------------------------------------
   Variables
   ---------------------------------------- */

/* indice de la reseña visible */
let actual = 0;

/* Numero de productos añadidos */
let totalCarrito = 0;

/* ----------------------------------------
   funciones: Carrusel
   ---------------------------------------- */

/* Desplaza el carrusel hacia la derecha , vuelve al inicio al llegar al final */
const handleCarouselScroll = function () {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const amount = window.innerWidth < 768 ? 200 : 300; /* Ajuste de scroll en movil consultado con IA */

    if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = 0;
    } else {
        carousel.scrollLeft += amount;
    }
};

/* ----------------------------------------
   Funciones de reseñas
   ---------------------------------------- */

/* Muestra una reseña segun su indice y activa su punto */
const handleMostrarCita = function (index) {
    citas.forEach(function (cita) {
        cita.style.display = 'none';
    });
    puntos.forEach(function (punto) {
        punto.classList.remove('reviews__dot--active');
    });

    citas[index].style.display = 'block';
    puntos[index].classList.add('reviews__dot--active');
};

/* avanza a la siguiente reseña, vuelve a la primera si se pasa */
const handleSiguienteCita = function () {
    actual += 1;

    if (actual >= citas.length) {
        actual = 0;
    }

    handleMostrarCita(actual);
};

/* ----------------------------------------
   Funciones: Carrito
   ---------------------------------------- */

/* suma 1 al contador y lo muestra en el header */
const handleAgregarCarrito = function () {
    totalCarrito += 1;
    contadorCarrito.textContent = totalCarrito;
    contadorCarrito.classList.remove('header__cart-count--hidden');
};

/* ----------------------------------------
   Funciones: filtros
   ---------------------------------------- */

/* Filtra los productos segun el genero del botón clickeado */
const handleFiltrar = function () {
    const filtro = this.getAttribute('data-filter');

    botonesFiltro.forEach(function (btn) {
        btn.classList.remove('filters__btn--active');
    });
    this.classList.add('filters__btn--active');

    productos.forEach(function (producto) {
        if (filtro === 'todos' || producto.getAttribute('data-genre') === filtro) {
            producto.style.display = 'flex';
        } else {
            producto.style.display = 'none';
        }
    });
};

/* ----------------------------------------
   Eventos y temporizadores
   ---------------------------------------- */

/* Carrusel automatico cada 3 segundos */
if (carousel) {
    setInterval(handleCarouselScroll, 3000);
}

/* Slider de reseñas automático cada 5 segundos */
if (citas.length > 0) {
    setInterval(handleSiguienteCita, 5000);
}

/* Click en los puntos para cambiar reseña */
puntos.forEach(function (punto, index) {
    punto.addEventListener('click', function () {
        actual = index;
        handleMostrarCita(actual);
    });
});

/* Click en botones de añadir al carrito */
botonesCarrito.forEach(function (btn) {
    btn.addEventListener('click', handleAgregarCarrito);
});

/* Click en botones de filtro */
botonesFiltro.forEach(function (btn) {
    btn.addEventListener('click', handleFiltrar);
});

})();