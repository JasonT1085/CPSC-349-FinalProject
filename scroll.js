let lol = document.getElementById('lol');
let introtext = document.getElementById('intro-text');

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    let scalingFactor = window.innerWidth / 1920;

    lol.style.marginTop = value * 0.5 * scalingFactor + 'px';
    introtext.style.marginTop = value * 0.4 * scalingFactor + 'px';
});

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var parallaxHeight = $('.parallax').height();
    var opacity = 1 - (scrollTop / (parallaxHeight / 2));

    if (opacity >= 0) {
        $('.parallax').css('opacity', opacity);
    }
});



