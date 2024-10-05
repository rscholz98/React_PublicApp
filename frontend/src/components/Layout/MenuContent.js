/** @format */

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const mainListItems = [
 { text: "Home", icon: <HomeRoundedIcon /> },
 { text: "Analytics", icon: <AnalyticsRoundedIcon /> },
 { text: "Clients", icon: <PeopleRoundedIcon /> },
 { text: "Tasks", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
 { text: "Settings", icon: <SettingsRoundedIcon /> },
 { text: "About", icon: <InfoRoundedIcon /> },
 { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent({ setSelectedPage }) {
 // State to keep track of the selected item
 const [selectedItem, setSelectedItem] = React.useState("Home");

 const handleListItemClick = (text) => {
  setSelectedItem(text); // Update selected item
  setSelectedPage(text); // Update the parent state
 };

 return (
  <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
   {/* Main list */}
   <List dense>
    {mainListItems.map((item, index) => (
     <ListItem key={index} disablePadding sx={{ display: "block" }}>
      <ListItemButton
       onClick={() => handleListItemClick(item.text)} // Handle click
       selected={selectedItem === item.text} // Apply selected prop
      >
       <ListItemIcon>{item.icon}</ListItemIcon>
       <ListItemText primary={item.text} />
      </ListItemButton>
     </ListItem>
    ))}
   </List>

   {/* Secondary list */}
   <List dense>
    {secondaryListItems.map((item, index) => (
     <ListItem key={index} disablePadding sx={{ display: "block" }}>
      <ListItemButton
       onClick={() => handleListItemClick(item.text)} // Handle click
       selected={selectedItem === item.text} // Apply selected prop
      >
       <ListItemIcon>{item.icon}</ListItemIcon>
       <ListItemText primary={item.text} />
      </ListItemButton>
     </ListItem>
    ))}
   </List>
  </Stack>
 );
}
