document.getElementById('shorten-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const urlInput = document.getElementById('url-input').value;
    
    if (urlInput) {
        // Aquí puedes integrar la funcionalidad de acortar URLs
        const shortenedUrl = "https://short.url/12345";  // Ejemplo de URL acortada
        document.getElementById('short-url').textContent = `Tu URL acortada: ${shortenedUrl}`;
    }
});
