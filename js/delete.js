const deleteJob = async (id) => {
 try {
      await fetch(`${BASE_URL}/jobs/${id}`,{
      method: 'DELETE',

    });

  } catch (error) {
    alert("Error deleting job")
        
  } finally {
    window.location.href = "index.html";
  }
};