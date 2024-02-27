
import './Style.css';
import './Background.css';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
















    return (
        <main>
            <br></br>
            <br></br>
            <h1>Input a Slide!</h1>
            <form id="uploadForm" enctype="multipart/form-data" action="http://localhost:5000/upload" method="POST">
            <input type="file" name="image" id="imageInput" accept="image/*" onchange="loadFile(event)"/>
            <img id="output"/>
            <script>
                var loadFile = function(event) {
                var output = document.getElementById('output');
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function() {
                    URL.revokeObjectURL(output.src) // free memory
                }
                };
            </script>
            <button type="submit">Upload</button>
        </form>

        <script src="script.js"></script>

        
        
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            
        

            
        </main>
    )
}

export default Upload;