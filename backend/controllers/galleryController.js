// Ensure you are using the API_URL variable from your DataContext
const handleAddPhoto = async (photoData) => {
  try {
    const response = await axios.post(`${API_URL}/gallery`, {
      title: photoData.title,
      description: photoData.description,
      image_url: photoData.imageUrl, // Ensure this matches your DB column
      category: photoData.category,
      display_order: photoData.displayOrder || 0
    }, {
      headers: {
        // You MUST send the token so the 'protect' middleware allows the request
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Photo added successfully:", response.data);
    alert("Photo added successfully!");
  } catch (error) {
    // This will help you see the exact error if it fails
    console.error("Full Error Object:", error);
    const errorMessage = error.response?.data?.message || "Failed to add photo";
    alert(`Error: ${errorMessage}`);
  }
};