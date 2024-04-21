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
import axiosInstance from "../../plugins/axios";
import { BallTriangle } from "react-loader-spinner";
import { useFormik } from "formik";

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
  const [mode, setMode] = useState(0);

  const [userDetails, setUserDetails] = useState({});
  const [userToView, setUserToView] = useState({});
  const [loading, setLoading] = useState(true);
 

  let formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      role: 0,
      phone: "",
      countryCode: "002",
    },
    onSubmit: handleUser,
  });
  async function removeUser(id) {
    try {
      let { data } = await axiosInstance.delete(`v1/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }
  function editUserModal(data) {
    formik.values.name = data.name;
    formik.values.role = data.role;
    formik.values.phone = data.phone;
    formik.values.email = data.email;
    formik.values.id = data.id;
    setMode(1);
    setOpen(true);
  }
  function handleUser(values) {
    if (mode === 0) {
      createUser(values);
    } else {
      editUser(values);
    }
  }
  function viewUser(data) {
    console.log(data);
    setUserToView(data);
    setViewModal(true);
  }
  async function getUsers() {
    try {
      let { data } = await axiosInstance.get("v1/users?pageSize=-1");
      console.log(data);
      setLoading(false);

      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser(values) {
    try {
      let data = await axiosInstance.post("v1/users", values);
      console.log(data);
      getUsers();

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }
  async function editUser(values) {
    console.log(values);
    try {
      let data = await axiosInstance.patch(`v1/users/${values.id}`, values);
      console.log(data);
      getUsers();

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
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
  const [viewModal, setViewModal] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setMode(0);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            <form action="" onSubmit={formik.handleSubmit}>
              <TextField
                required
                id="name"
                label="username"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 3 }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <TextField
                id="email"
                label="email"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 3 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                required
                id="password"
                label="password"
                type="password"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 3 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <FormControl fullWidth sx={{ width: "100%", marginBottom: 3 }}>
                <InputLabel id="demo-simple-select-label">role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="role"
                  name="role"
                  label="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={null}>select role</MenuItem>

                  <MenuItem value={0}>admin</MenuItem>
                  <MenuItem value={1}>worker</MenuItem>
                  <MenuItem value={2}>data entry</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="phone"
                label="phone"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 3 }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </form>
          </Box>
        </Modal>{" "}
        <Modal
          open={viewModal}
          onClose={() => setViewModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              required
              disabled
              id="name"
              label="username"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
              value={userToView.name}
            />

            <TextField
              disabled
              id="email"
              label="email"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
              value={userToView.email}
            />

            <FormControl fullWidth sx={{ width: "100%", marginBottom: 3 }}>
              <InputLabel id="demo-simple-select-label">role</InputLabel>
              <Select
                readOnly
                labelId="demo-simple-select-label"
                id="role"
                name="role"
                label="role"
                value={userToView.role}
              >
                <MenuItem value={null}>select role</MenuItem>

                <MenuItem value={0}>admin</MenuItem>
                <MenuItem value={2}>worker</MenuItem>
                <MenuItem value={1}>data entry</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled
              id="phone"
              label="phone"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 3 }}
              value={userToView.phone}
            />
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
                    <i
                      className="log mx-2 fa-solid fa-eye"
                      onClick={() => viewUser(row)}
                    ></i>
                    <i
                      className="log mx-2 fa-solid fa-pen-to-square"
                      onClick={() => editUserModal(row)}
                    ></i>
                    <i
                      className="log mx-2 fa-solid fa-trash"
                      onClick={() => removeUser(row.id)}
                    ></i>
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
