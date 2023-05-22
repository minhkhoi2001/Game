import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardNavbar from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [state, setState]=useState()
  const parentCallback =(data)=>{
      setState(data)
  }
  const parentCallback1 =(data)=>{
    setState(data)
}
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar callback={parentCallback} />
      <DashboardSidebar callback={parentCallback1} open={state}/>
    </>
  );
};
