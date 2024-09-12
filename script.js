// Obtener el valor del contador de localStorage
let counter = localStorage.getItem('urlCounter') || 0;

// Actualizar el contador de URLs cuando la página carga
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('counter').textContent = `URLs acortadas en esta sesión: ${counter}`;
});

// Escuchar el evento de envío de formulario
document.getElementById('shorten-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const urlInput = document.getElementById('url-input').value.trim();
    const aliasInput = document.getElementById('alias-input').value.trim();

    if (urlInput) {
        let apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(urlInput)}`;

        // Añadir alias si está presente
        if (aliasInput) {
            apiUrl += `&shorturl=${encodeURIComponent(aliasInput)}`;
        }

        // Realizar la solicitud de acortar URL
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.shorturl) {
                    const shortUrlElement = document.getElementById('short-url');
                    shortUrlElement.textContent = `Tu URL acortada: ${data.shorturl}`;

                    // Incrementar el contador y actualizar la sesión
                    counter++;
                    localStorage.setItem('urlCounter', counter);
                    document.getElementById('counter').textContent = `URLs acortadas en esta sesión: ${counter}`;

                    // Mostrar el botón de copiar y configurar el evento
                    const copyBtn = document.getElementById('copy-btn');
                    copyBtn.style.display = 'inline-block';
                    copyBtn.removeEventListener('click', copyURL);  // Evitar múltiples listeners
                    copyBtn.addEventListener('click', copyURL.bind(null, data.shorturl));
                } else if (data.errormessage) {
                    document.getElementById('short-url').textContent = 'Error: ' + data.errormessage;
                } else {
                    document.getElementById('short-url').textContent = 'Error al acortar la URL';
                }
            })
            .catch(error => {
                document.getElementById('short-url').textContent = 'Ocurrió un error: ' + error.message;
            });
    }
});

// Función para copiar la URL al portapapeles
function copyURL(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('URL copiada al portapapeles');
    }).catch(err => {
        alert('Error al copiar la URL');
    });
}
