const deleteJob = async (id) => {
  showDeleteConfirm();
  $("#btn-delete").addEventListener("click", async () => {

  try {
      await fetch(`${BASE_URL}/jobs/${id}`,{
      method: 'DELETE',
      
    });

  } catch (error) {
    console.log(error)
    
  } finally {
    window.location.href = "index.html";
  }
  
});

};