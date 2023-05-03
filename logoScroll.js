let lol = document.getElementById('lol');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    lol.style.marginTop = value * 0.5 + 'px'
});