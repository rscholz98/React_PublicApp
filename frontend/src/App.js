/** @format */

import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/Layout/AppNavbar";
import Header from "./components/Layout/Header";
import SideMenu from "./components/Layout/SideMenu";
import AppTheme from "./theme/AppTheme";
import {
 chartsCustomizations,
 dataGridCustomizations,
 datePickersCustomizations,
 treeViewCustomizations,
} from "./theme/customizations";

// Import your pages/components
import HomePage from "./components/MainGrid/01_HomePage";
import AnalyticsPage from "./components/MainGrid/02_AnalyticsPage";
import ClientsPage from "./components/MainGrid/03_ClientsPage";
import TasksPage from "./components/MainGrid/04_TasksPage";

const xThemeComponents = {
 ...chartsCustomizations,
 ...dataGridCustomizations,
 ...datePickersCustomizations,
 ...treeViewCustomizations,
};

export default function Dashboard(props) {
 // State to manage the selected page
 const [selectedPage, setSelectedPage] = React.useState("Home");

 // Function to render the selected component
 const renderPage = () => {
  switch (selectedPage) {
   case "Home":
    return <HomePage />;
   case "Analytics":
    return <AnalyticsPage />;
   case "Clients":
    return <ClientsPage />;
   case "Tasks":
    return <TasksPage />;
   default:
    return <HomePage />;
  }
 };

 return (
  <AppTheme {...props} themeComponents={xThemeComponents}>
   <CssBaseline enableColorScheme />
   <Box sx={{ display: "flex" }}>
    <SideMenu setSelectedPage={setSelectedPage} />
    <AppNavbar />
    {/* Main content */}
    <Box
     component="main"
     sx={(theme) => ({
      flexGrow: 1,
      backgroundColor: theme.vars
       ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
       : alpha(theme.palette.background.default, 1),
      overflow: "auto",
     })}
    >
     <Stack
      spacing={2}
      sx={{
       alignItems: "center",
       mx: 3,
       pb: 5,
       mt: { xs: 8, md: 0 },
      }}
     >
      <Header selectedPage={selectedPage} />
      {/* Render the page dynamically based on selection */}
      {renderPage()}
     </Stack>
    </Box>
   </Box>
  </AppTheme>
 );
}
