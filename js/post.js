const registerJob = async () => {
    try {
      const job = getJobForm();
  
      const response = await fetch(`${BASE_URL}/jobs`,{
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(job),
      });
  
      const jobs = await response.json();
    
    } catch (error) {
    alert("Error creating job");
  
    } finally {
    window.location.href = "index.html";
    }
   
  };