//Funciones de utilidad

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const hideElement = (element) => element.classList.add("is-hidden");
const showElement = (element) => element.classList.remove("is-hidden");

const BASE_URL = "https://63da8f4219fffcd620cc7dcb.mockapi.io/api"

let isEditing = false;

//Menú hamburguesa
$(".navbar-burger").addEventListener("click",()=>{
    $(".navbar-burger").classList.toggle("is-active");
    $(".navbar-menu").classList.toggle("is-active");
});

const showCreateForm = () => {
  hideElement($("#cards-container"));
  hideElement($("#filters-container"));
  hideElement($("#container-see-details"));
  showElement($("#job-container"));
  hideElement($("#container-delete-confirm"));
}

const showSeeDetails = () => {
  showElement($("#container-see-details"));
  hideElement($("#cards-container"));
}

const showDeleteConfirm = () => {
  showElement($("#container-delete-confirm"));
  hideElement($("#cards-container"));
  hideElement($("#container-see-details"));
  hideElement($("#footer"));
}

const hideDeleteConfirm = () => {
  hideElement($("#container-delete-confirm"));
  showElement($("#cards-container"));
}

//DOM
const renderJobs = (jobs) => {
    $("#cards-container").innerHTML = "";
    for (const job of jobs) {
        const { name, description, location, category, seniority, id } = job;
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
                    <button class="button is-small is-danger btn-see-details" data-id="${id}">See Details</button>
                  </div>
                </div>
              </div>
        `;
    }

    for (const button of $$(".btn-see-details")) {
      button.addEventListener("click", () => {
        const id= button.getAttribute("data-id");
        showSeeDetails();
        getJob(id);
        });
  }
};

const renderSeeDetails = ({ name, description, location, category, seniority, id}) => {
  $("#container-see-details").innerHTML = "";
  $("#container-see-details").innerHTML += `
      <div class="columns is-centered mt-6">
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
              <button class="button is-small is-primary btn-edit-job" data-id="${id}">Edit Job</button>
              <button class="button is-small is-danger btn-delete-job" data-id="${id}">Delete Job</button>
            </div>
          </div>
        </div>
      </div>
  `

  $(".btn-delete-job").addEventListener("click", () => {
    $(".btn-delete-job").setAttribute("data-id", id);
    showDeleteConfirm();
    $("#btn-delete").setAttribute("data-id", id);
  });

  $(".btn-edit-job").addEventListener("click", () => {
    isEditing = true;
    const id = $(".btn-edit-job").getAttribute("data-id");
    $("#job-container").classList.remove("is-hidden")
    hideElement($("#filters-container"));
    hideElement($("#container-see-details"));
    $("#btn-submit").textContent = "Editar";
    $("#btn-submit").classList.add("is-primary");
    $("#btn-submit").classList.remove("is-danger");
    $("#btn-submit").setAttribute("data-id", id);
    getJob(id);
  });
};

//Eventos
$("#create-job-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if(isEditing){
      const jobID = $("#btn-submit").getAttribute("data-id")
      updateJob(jobID);
    }else{
      registerJob();
    }
});

$("#btn-create-job").addEventListener("click", () => {
  showCreateForm();
  $("#btn-submit").classList.remove("is-primary");
  $("#btn-submit").classList.add("is-danger");
  $("#btn-submit").textContent = "Submit";
});

$("#btn-home").addEventListener("click", () => {
  showElement($("#cards-container"));
  showElement($("#filters-container"));
  hideElement($("#job-container"));
  hideElement($("#container-see-details"));
  hideElement($("#container-delete-confirm"));
});

$("#btn-delete").addEventListener("click", async () =>{
  deleteJob($("#btn-delete").getAttribute("data-id"))
});

$("#btn-delete-cancel").addEventListener("click", hideDeleteConfirm)
$(".delete").addEventListener("click", hideDeleteConfirm)

$(".btn-delete-job").addEventListener("click", () => {
  const id = $(".btn-delete-job").getAttribute("data-id");
  deleteJob(id);
});