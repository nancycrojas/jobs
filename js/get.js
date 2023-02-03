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