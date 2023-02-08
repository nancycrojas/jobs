const getJobsAndFilter = async () => {
    try {
        const response = await fetch(`${BASE_URL}/jobs`)
        const jobs = await response.json();
        
        renderJobs(jobs);
        completeOptionsSelects(jobs);

    } catch (error) {
        alert("Error filter");
    }

};

getJobsAndFilter()


const filterJobs = async () => {
    let filteredJobs = await getJobs();
    const locationFilter = $("#location-filter").value;
    const seniorityFilter = $("#seniority-filter").value;
    const categoryFilter = $("#category-filter").value;
  
    locationFilter !== "Select Location ..." && (filteredJobs = filteredJobs.filter(job => job.location === locationFilter));
    seniorityFilter !== "Select Seniority ..." && (filteredJobs = filteredJobs.filter(job => job.seniority === seniorityFilter));
    categoryFilter !== "Select Category ..." && (filteredJobs = filteredJobs.filter(job => job.category === categoryFilter));
  
    $("#cards-container").innerHTML = "";
    renderJobs(filteredJobs);
  };