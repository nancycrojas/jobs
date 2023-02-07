const updateJob = async (id) => {
    try {
        const job = getJobForm();
        
        const response = await fetch(`${BASE_URL}/jobs/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(job),
      })
      const jobs =await response.json();
  
    } catch (error) {
      alert("Error editing job")
          
    } finally {
      window.location.href = "index.html";
    }

};

const getJobForm = () => {
    return {
        name: $("#input-job-title").value,
        description: $("#input-description").value,
        location: $("#input-location").value,
        category: $("#input-category").value,
        seniority: $("#input-seniority").value,
      };
};