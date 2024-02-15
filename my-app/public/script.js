document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('No file selected for upload.');
        return;
    }



    if (file.type !== 'image') {
        alert('Only image files can be uploaded.');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Image uploaded successfully!');
        } else {
            alert('Failed to upload image.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

var loadFile = function(event) {
    var output = document.getElementById('output');
    if (event.target.files && event.target.files[0]) {
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src); // Free memory
        };
    } else {
        console.error('No file selected.');
        // Handle this scenario as needed, such as displaying an error message to the user
    }
};