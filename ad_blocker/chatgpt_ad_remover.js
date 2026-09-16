setInterval( () => {
    document.querySelectorAll('aria-label[" Sponsored "]').forEach((element) => {
        element.style.display = 'none';
    })
}, 1000)
