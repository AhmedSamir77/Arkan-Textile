import React from "react";
import "./ContactUs.module.css";
import SideBar from "../../Components/SideBar/SideBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
export default function ContactUs() {
  return (
    <>
      <SideBar />

      <div className="container customize mb-3 ps-5 ">
        <h2 class="fontyy" variant="h4" color="dark">Get in touch with our support team to learn more about website</h2>
      </div>
     
      <div className="container customize d-flex ">
        <div>
        <h5 class="fontyyy">First Name:</h5>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          sx={{ width: "450px" }}
        />
        </div>
        <div>
        <h5 class="ms-5 fontyyy">Last Name:</h5>

         <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          sx={{ width: "450px" }}
          className="ms-5"
        />
        </div>
        
      </div>
     <div className="container customize mt-3">
      <h5 class=" fontyyy">Email Address:</h5>
     <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: "950px" }}
          
        />
     </div>
     <div className="container customize mt-3">
      <h5 class=" fontyyy">Phone Number:</h5>
     <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          sx={{ width: "950px" }}
          
        />
     </div>

     <div className="container customize mt-3">
      <h5 class=" fontyyy">Notes:</h5>
     <TextField
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          sx={{ width: "950px" }}
          
        />
     </div>

     <div className="container customize mt-3">
      <h5 class=" fontyyy">Country:</h5>
     <TextField
          id="outlined-basic"
          label="Country"
          variant="outlined"
          sx={{ width: "950px" }}
          
        />
     </div>
    <div className="container customize mt-4 ">
    <Button variant="contained"  sx={{ width: "950px" }}>Confirm</Button>
    </div>
   
    </>
  );
}
