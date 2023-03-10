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
                    <p class="is-size-7  is-size-6-mobile">${description}</p>
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
    $("#name-error").textContent = "";
    $("#btn-submit").classList.add("is-primary");
    $("#btn-submit").classList.remove("is-danger");
    $("#btn-submit").setAttribute("data-id", id);
    getJob(id);
  });
};

//Filtros
const completeOptionsSelects = (jobs) => {
  $("#location-filter").innerHTML = `
  <option selected>Select Location ...</option>
  `;
  $("#seniority-filter").innerHTML = `
  <option selected>Select Seniority ...</option>
  `;
  $("#category-filter").innerHTML = `
  <option selected>Select Category ...</option>
  `;

  const locationFilter = jobs.map((location) => location.location);
  const setlocationFilter = new Set(locationFilter)

  const seniorityFilter = jobs.map((seniority) => seniority.seniority);
  const setseniorityFilter = new Set(seniorityFilter)

  const categoryFilter = jobs.map((category) => category.category);
  const setcategoryFilter = new Set(categoryFilter)

  for(const location of setlocationFilter) {
      $("#location-filter").innerHTML += `
      <option value="${location}">${location}</option>
    `;
  }

  for(const seniority of setseniorityFilter) {
      $("#seniority-filter").innerHTML += `
      <option value="${seniority}">${seniority}</option>
    `;
  }

  for(const category of setcategoryFilter) {
      $("#category-filter").innerHTML += `
      <option value="${category}">${category}</option>
    `;
  }
};

//Validación
const validateForm = () => {
  let isValid = false;

  if($("#input-job-title").value.length >= 3){
    isValid = true;
  } else {
    $("#name-error").textContent = "El nombre debe tener más de 3 caracteres";
  }
  return isValid;
};

//Eventos
$("#create-job-form").addEventListener("submit", (e) => {
    e.preventDefault();

    if(validateForm()){

      if(isEditing){
        const jobID = $("#btn-submit").getAttribute("data-id")
        updateJob(jobID);
      }else{
        registerJob();
      }

    }

});

$("#btn-create-job").addEventListener("click", () => {
  showCreateForm();
  $("#btn-submit").classList.remove("is-primary");
  $("#btn-submit").classList.add("is-danger");
  $("#btn-submit").textContent = "Submit";
  $("#name-error").textContent = "";
  $("#create-job-form").reset();
});

$("#btn-home").addEventListener("click", () => {
  showElement($("#cards-container"));
  showElement($("#filters-container"));
  hideElement($("#job-container"));
  hideElement($("#container-see-details"));
  hideElement($("#container-delete-confirm"));
});

$("#btn-delete").addEventListener("click", () =>{
  deleteJob($("#btn-delete").getAttribute("data-id"))
});

$("#btn-delete-cancel").addEventListener("click", hideDeleteConfirm)
$(".delete").addEventListener("click", hideDeleteConfirm)

$(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  filterJobs();
});

$("#btn-clear").addEventListener("click", () => {
  $("#filter-form").reset();
});