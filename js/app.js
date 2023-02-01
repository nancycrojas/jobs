//Funciones de utilidad

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


//Menú hamburguesa
$(".navbar-burger").addEventListener("click",()=>{
    $(".navbar-burger").classList.toggle("is-active");
    $(".navbar-menu").classList.toggle("is-active");
});