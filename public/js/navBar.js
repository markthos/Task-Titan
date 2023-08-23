document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');

    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);

        const projectData = {
            name: formData.get('name'),
            date_started: formData.get('date_started'),
            type: formData.get('type')
        };

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify(projectData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Project added successfully
                window.location.href = '/'; // Redirect to homepage or project list
            } else {
                // Handle error case
                console.error('Error adding project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
