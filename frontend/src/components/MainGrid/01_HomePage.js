/** @format */
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
// Import the main Viewer component and the Worker
import { Viewer, Worker } from "@react-pdf-viewer/core";
// Import the default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function HomePage() {
 const [prompt, setPrompt] = useState("");
 const [pdfFile, setPdfFile] = useState(null);
 const [pdfBase64, setPdfBase64] = useState(null); // For sending to the server
 const [responseMessage, setResponseMessage] = useState("");

 // Create new plugin instance
 const defaultLayoutPluginInstance = defaultLayoutPlugin();

 // Handle PDF file selection
 const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
   if (selectedFile.type === "application/pdf") {
    const reader = new FileReader();
    reader.onloadend = (event) => {
     setPdfFile(event.target.result);
     // Extract base64 data for sending to the server
     const base64 = event.target.result.split(",")[1];
     setPdfBase64(base64);
    };
    reader.readAsDataURL(selectedFile);
   } else {
    setPdfFile(null);
    setResponseMessage("Please select a valid PDF file.");
   }
  }
 };

 // Handle the form submission
 const handleSubmit = async () => {
  if (!prompt || !pdfBase64) {
   setResponseMessage("Please provide both a prompt and a PDF file.");
   return;
  }

  try {
   const response = await axios.post("/LLM/request_prompt", {
    prompt,
    pdf_file: pdfBase64,
   });

   setResponseMessage(response.data.content);
  } catch (error) {
   setResponseMessage("Error: " + error.response?.data?.detail || "Unknown error occurred");
  }
 };

 return (
  <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "none" } }}>
   <Grid container spacing={2} size={12}>
    <Grid
     item
     size={6}
     style={{
      border: "1px solid rgba(0, 0, 0, 0.3)",
      height: "800px",
     }}
    >
     <Grid container spacing={2} columns={6}>
      {/* Upload PDF */}
      <Grid item size={2}>
       <Button variant="contained" component="label" size="small" fullWidth>
        Upload PDF
        <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
       </Button>
      </Grid>

      {/* Submit button */}
      <Grid item size={2}>
       <Button variant="contained" color="primary" size="small" fullWidth onClick={handleSubmit}>
        Submit
       </Button>
      </Grid>

      <Grid item size={6}>
       <TextField
        label="Enter your prompt"
        variant="outlined"
        size="small"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{
         "& legend": { display: "none" },
         "& .MuiInputLabel-shrink": {
          opacity: 0,
          transition: "all 0.2s ease-in",
         },
        }}
       />
      </Grid>
     </Grid>
    </Grid>

    {/* Display the PDF Viewer if a PDF is uploaded */}
    {pdfFile ? (
     <Grid
      item
      size={6}
      style={{
       border: "1px solid rgba(0, 0, 0, 0.3)",
       height: "800px",
       overflow: "auto",
      }}
     >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
       <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
     </Grid>
    ) : (
     <Grid
      item
      size={6}
      style={{
       border: "1px solid rgba(0, 0, 0, 0.3)",
       height: "800px",
       overflow: "auto",
      }}
     >
      <Typography variant="body1" align="center">
       No PDF file selected.
      </Typography>
     </Grid>
    )}

    {/* Prompt */}

    {responseMessage && (
     <Grid item size={12}>
      <Typography variant="body1" align="center">
       {responseMessage}
      </Typography>
     </Grid>
    )}
   </Grid>
  </Box>
 );
}
