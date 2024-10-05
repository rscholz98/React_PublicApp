/** @format */

import * as React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Copyright from "../../internals/components/Copyright";
import axios from "axios";

export default function HomePage() {
 const [pdfFile, setPdfFile] = useState(null);
 const [pdfData, setPdfData] = useState(null);
 const [prompt, setPrompt] = useState("");
 const [numPages, setNumPages] = useState(null);

 // Handles PDF file upload
 const handleFileChange = (event) => {
  const file = event.target.files[0];
  setPdfFile(file);
  const reader = new FileReader();
  reader.onloadend = () => {
   const base64String = reader.result.split(",")[1]; // Get base64 part only
   setPdfData(base64String);
  };
  reader.readAsDataURL(file);
 };

 // Handles PDF file load for preview
 const onDocumentLoadSuccess = ({ numPages }) => {
  setNumPages(numPages);
 };

 // Sends the prompt and PDF to the backend
 const handleSubmit = async () => {
  if (!pdfData || !prompt) {
   alert("Please upload a PDF and enter a prompt.");
   return;
  }

  try {
   const response = await axios.post("http://localhost:8200/LLM/request_prompt", {
    prompt: prompt,
    pdf_file: pdfData,
   });

   console.log("Response:", response.data);
   alert("Successfully sent the request.");
  } catch (error) {
   console.error("Error sending request:", error);
   alert("There was an error sending the request.");
  }
 };

 return (
  <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
   <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
    Home
   </Typography>

   {/* PDF File Upload */}
   <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={6}>
     <Button variant="contained" component="label">
      Upload PDF
      <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
     </Button>
    </Grid>

    {/* Prompt Text Input */}
    <Grid item xs={12} sm={6}>
     <TextField
      fullWidth
      label="Enter Prompt"
      variant="outlined"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
     />
    </Grid>
   </Grid>

   {/* PDF Preview */}
   <Grid container spacing={2}>
    {pdfFile && (
     <Grid item xs={12} sm={6}>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
       {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} width={300} />
       ))}
      </Document>
     </Grid>
    )}
   </Grid>

   {/* Submit Button */}
   <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
     <Button variant="contained" onClick={handleSubmit}>
      Submit Prompt and PDF
     </Button>
    </Grid>
   </Grid>

   <Copyright sx={{ my: 4 }} />
  </Box>
 );
}
