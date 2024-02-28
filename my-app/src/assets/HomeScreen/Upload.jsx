import React, { useState, useEffect } from 'react';
import './Style.css';
import './Background.css';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    return (
        <main>
            <br></br>
            <br></br>
            <h1>Input a Slide!</h1>
            <form id="uploadForm" encType="multipart/form-data" action="http://localhost:5000/upload" method="POST">
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