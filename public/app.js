// Validación de ruta Desarrollo/Producción
var url = window.location.href;
var swLocation = '/ProyectoFinal/sw.js';

// Service Worker
if (navigator.serviceWorker) {
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register(swLocation);
}