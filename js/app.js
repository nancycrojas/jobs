//Funciones de utilidad

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63da8f4219fffcd620cc7dcb.mockapi.io/api"

//Menú hamburguesa
$(".navbar-burger").addEventListener("click",()=>{
    $(".navbar-burger").classList.toggle("is-active");
    $(".navbar-menu").classList.toggle("is-active");
});

//DOM
const renderJobs = (jobs) => {
    $("#cards-container").innerHTML = "";
    for (const job of jobs) {
        const { name, description, location, category, seniority } = job;
        $("#cards-container").innerHTML += `
              <div class="card column is-2 is-3-tablet m-4">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${name}</p>
                    </div>
                  </div>
                  <div class="content">
                    <p>${description}</p>
                  </div>
                  <div class="media is-flex-wrap-wrap">
                    <p class="is-size-7 has-text-white has-background-black p-1 m-1 has-text-centered">${location}</p>
                    <p class="is-size-7 has-text-white has-background-black p-1 m-1 has-text-centered">${seniority}</p>
                    <p class="is-size-7 has-text-white has-background-black p-1 m-1 has-text-centered">${category}</p>
                  </div>
                  <div class="control">
                    <button class="button is-small is-danger">See Details</button>
                  </div>
                </div>
              </div>
        `;
    }
};

$("#create-job-form").addEventListener("submit", (e) => {
    e.preventDefault();
    registerJob();
});