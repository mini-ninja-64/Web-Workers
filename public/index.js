function appendParagraph(string) {
  let paragraph = document.createElement("p");
  let text = document.createTextNode(string);
  paragraph.appendChild(text);

  let fileReturnDiv = document.getElementById("file-return");
  fileReturnDiv.appendChild(paragraph);
}

function handleUpload(files) {
  Object.values(files).forEach(file => {
    // Create web worker thread
    const fileProcessor = new Worker("FileProcessor.js");
    // Create file reader
    const reader = new FileReader();

    // Once file is loaded
    reader.onloadend = () => {
      // Send file to the worker thread
      fileProcessor.postMessage(reader.result);

      const onMessage = function(event) {
        // Add worker result to document
        appendParagraph(event.data);

        // Close the worker
        // Unsure if neccesary
        // fileProcessor.terminate();
      };

      // Listen for messages from the worker thread
      fileProcessor.addEventListener("message", onMessage);
    };

    // Read the file into the file reader
    reader.readAsText(file);
  });
}
