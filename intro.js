let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        logoSpan.forEach((span, idx)=>{
            setTimeout(() => {
                span.classList.add('active');

            }, (idx + 1) * 250)
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {

                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 250)
            })
        }, 2400);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 5000);
        
    })
})