import express from 'express';
import { readFile, readFileSync, writeFileSync } from 'fs';
import cors from 'cors'; // Import CORS package
import { files } from './file.js';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS for all origins

// Endpoint to get the current file content
app.get('/file', (req, res) => {
  res.send(files);
});

app.post('/update', (req, res) => {
  try {
    const { file, path } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: "File content is missing" });
    }

    if (!path) {
      return res.status(400).json({ success: false, message: "File path is missing" });
    }

    const pathSegments = path.split('/').filter(segment => segment); // Split and filter empty segments
    let current = files; // Start at the root of the `files` object

    // Traverse the object structure using the path segments
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];

      if (i === pathSegments.length - 1) {
        // If this is the last segment, update the file contents
        if (current[segment]?.file) {
          current[segment].file.contents = file;
        } else {
          return res.status(404).json({
            success: false,
            message: "Target file not found at the specified path",
          });
        }
      } else {
        // Traverse deeper into the directory structure
        if (current[segment]?.directory) {
          current = current[segment].directory;
        } else {
          return res.status(404).json({
            success: false,
            message: "Invalid path specified",
          });
        }
      }
    }

    // Return success response with updated content
    res.status(200).json({
      success: true,
      message: "File updated successfully",
      updatedContent: file,
    });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ success: false, message: "Failed to update the file", error });
  }
});



// Basic route
app.get('/', (req, res) => {
  res.send("Hello");
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
