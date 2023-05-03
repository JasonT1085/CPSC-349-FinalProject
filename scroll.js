let lol = document.getElementById('lol');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    lol.style.marginTop = value * 0.5 + 'px'

});

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var parallaxHeight = $('.parallax').height();
    var opacity = 1 - (scrollTop / (parallaxHeight / 2));

    if (opacity >= 0) {
        $('.parallax').css('opacity', opacity);
    }
});



