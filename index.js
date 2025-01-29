// Get form elements
const posterForm = document.getElementById('posterForm');
const movieTitleInput = document.getElementById('movie-title');
const artStyleSelect = document.getElementById('art-styles');
const posterOutput = document.getElementById('poster-output');

// Add form submit handler
posterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const movieTitle = movieTitleInput.value;
    const artStyle = artStyleSelect.value;
    
    try {
        // Show loading state
        posterOutput.innerHTML = 'Generating poster...';
        
        // Call backend API
        const response = await fetch('http://localhost:3000/generate-poster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieTitle, artStyle }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate poster');
        }

        const data = await response.json();
        posterOutput.innerHTML = `<img src="${data.imageUrl}" alt="Generated movie poster">`;
    } catch (error) {
        console.error('Error:', error);
        posterOutput.innerHTML = 'Error generating poster. Please try again.';
    }
});