//Funciones de utilidad

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const BASE_URL = "https://63da8f4219fffcd620cc7dcb.mockapi.io/api"

//Menú hamburguesa
$(".navbar-burger").addEventListener("click",()=>{
    $(".navbar-burger").classList.toggle("is-active");
    $(".navbar-menu").classList.toggle("is-active");
});

//Methods

const getJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/jobs`);
        
    const jobs = await response.json();
    renderJobs(jobs);

    } catch (error) {
        alert("Page not available at this time");
    }

};

getJobs();

const registerJob = async () => {
  try {
    const job = {
      name: $("#input-job-title").value,
      description: $("#input-description").value,
      location: $("#input-location").value,
      category: $("#input-category").value,
      seniority: $("#input-seniority").value,
    };

    const response = await fetch(`${BASE_URL}/jobs`,{
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(job),
    });

    const jobs = await response.json();
  
 } catch (error) {
  console.log(error);

 } finally {
  window.location.href = "index.html";
 }

};

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