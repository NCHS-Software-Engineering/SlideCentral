import React, { useState, useEffect } from 'react';
import './Style.css';
import './Background.css';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const onSubmit = e => {
        e.preventDefault();

        if (!selectedFile) {
            alert('No file selected for upload.');
            return;
        }

        if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png'     && selectedFile.type !== 'image/jpg') {
            alert('Only image files can be uploaded.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

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
    };

    return (
        <main>
            <br></br>
            <br></br>
            <h1>Input a Slide!</h1>
            <form id="uploadForm" encType="multipart/form-data" onSubmit={onSubmit}>
                <input type="file" name="image" id="imageInput" accept="image/*" onChange={onSelectFile} />
                {selectedFile &&  <img id="output" src={preview} />}
                <button type="submit">Upload</button>
            </form>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
        </main>
    )
}

export default Upload;