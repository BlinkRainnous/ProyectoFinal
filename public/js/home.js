// KDA
let active = document.getElementById('switch');
let fondo = document.body;
let titulo = document.getElementsByTagName('h1')[0];
let general = document.getElementById('general');
let ajustes = document.getElementById('ajustes');
let lugares = document.getElementById('lugares');
let clima = document.getElementById('clima');
let planes = document.getElementById('planes');


const temaKDA = () => {
    active.classList.toggle('active');
    fondo.classList.toggle('fondo--kda');
    titulo.classList.toggle('kda');
    general.classList.toggle('panel__boton--general_kda');
    ajustes.classList.toggle('panel__boton--ajustes_kda');
    lugares.classList.toggle('panel__boton--lugares_kda');
    clima.classList.toggle('panel__boton--clima_kda');
    planes.classList.toggle('panel__boton--planes_kda');

    // Guardar modo
    if (document.body.classList.contains('fondo--kda')) {
        localStorage.setItem('kda-mode', 'true');
    } else {
        localStorage.setItem('kda-mode', 'false');
    }
}

// Obtener modo
if (localStorage.getItem('kda-mode') === 'true') {
    active.classList.add('active');
    fondo.classList.add('fondo--kda');
    titulo.classList.add('kda');
    general.classList.add('panel__boton--general_kda');
    ajustes.classList.add('panel__boton--ajustes_kda');
    lugares.classList.add('panel__boton--lugares_kda');
    clima.classList.add('panel__boton--clima_kda');
    planes.classList.add('panel__boton--planes_kda');
} else {
    active.classList.remove('active');
    fondo.classList.remove('fondo--kda');
    titulo.classList.remove('kda');
    general.classList.remove('panel__boton--general_kda');
    ajustes.classList.remove('panel__boton--ajustes_kda');
    lugares.classList.remove('panel__boton--lugares_kda');
    clima.classList.remove('panel__boton--clima_kda');
    planes.classList.remove('panel__boton--planes_kda');
}

document.getElementById('switch').addEventListener('click', temaKDA, false);
