/** @format */

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../../internals/components/Copyright";

export default function Analytics() {
 return (
  <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
   {/* cards */}
   <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
    Analytics
   </Typography>
   <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
    Test
   </Grid>
   <Copyright sx={{ my: 4 }} />
  </Box>
 );
}
