import React, { useEffect, useState } from "react";
import "./Users.module.css";
import SideBar from "../../Components/SideBar/SideBar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Users() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  // axios api's

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/users", // Set your API base URL here
    timeout: 5000, // Set your desired timeout
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Get the token from your storage (localStorage, sessionStorage, etc.)
      const userToken = Cookies.get("userToken"); // Adjust this according to your setup

      // If userToken exists, add it to the Authorization header
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }

      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  async function getUsers() {
    try {
      let { data } = await axiosInstance.get("?pageSize=-1");
      console.log(data);
      setLoading(false);

      setUserDetails(data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getUsers();
  }, []);

  ////////////////////////////////////////////
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <>
      <SideBar />
      <div className="container customize">
        <Button onClick={handleOpen} variant="contained">
          {" "}
          <i class="fa-solid fa-plus"></i>Add New User
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              required
              id="filled-required"
              label="username"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
            />

            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
            />
            <TextField
              required
              id="filled-required"
              label="id"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
            />

            <FormControl fullWidth sx={{ width: "100%", marginBottom: 3 }}>
              <InputLabel id="demo-simple-select-label">role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="role"
                onChange={handleChange}
              >
                <MenuItem value={10}>admin</MenuItem>
                <MenuItem value={20}>super admin</MenuItem>
                <MenuItem value={30}>worker</MenuItem>
                <MenuItem value={30}>data entry</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
            />

            <Button variant="contained">Confirm</Button>
          </Box>
        </Modal>
      </div>

      {userDetails?.data ? (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "150px",
            marginLeft: "40px",
          }}
        >
          <Table className="w-75 move" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Id</StyledTableCell>
                <StyledTableCell align="left">Role</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <i className="log mx-2 fa-solid fa-eye"></i>
                    <i className="log mx-2 fa-solid fa-pen-to-square"></i>
                    <i className="log mx-2 fa-solid fa-trash"></i>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !loading && (
          <>
            <div className="container customize">DATA NOT FOUND</div>
          </>
        )
      )}

      {loading && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass={"justify-content-center"}
          visible={true}
        />
      )}
    </>
  );
}
