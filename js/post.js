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