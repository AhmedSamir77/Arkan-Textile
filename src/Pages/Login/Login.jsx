import React, { useState } from "react";
import "./Login.module.css";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DNA } from "react-loader-spinner";

export default function Login() {
  const [error, setError] = useState(null);

  const [loader, setLoader] = useState(false);

  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/[a-z0-9]{4,}/, "password is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitLoginForm,
    validationSchema,
  });

  let navigate = useNavigate();
  async function submitLoginForm(values) {
    setLoader(true);
    let { data } = await axios
      .post("http://127.0.0.1:8000/api/v1/auth/login?lang=ar", values)
      .catch((err) => {
        setLoader(false);

        setError("invalid account");
      });

    console.log(data);

    if (data.message === "You have logged in successfully") {
      Cookies.set("userToken", data.token);
      navigate("/users");
      setError(null);
      setLoader(false);
    }
  }

  return (
    <>
      <Box sx={{ width: "50%", margin: "auto", marginTop: 20, padding: 5 }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <h1>Login</h1>

        <form action="" onSubmit={formik.handleSubmit}>
          <div class="mb-3">
            <label for="" class="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger">{formik.errors.email}</div>
            )}
          </div>

          <div class="mb-3">
            <label for="" class="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-danger">{formik.errors.password}</div>
            )}
          </div>

          <Button disabled={!formik.isValid} type="submit" variant="contained">
            {loader ? (
              <DNA
                visible={true}
                height="40"
                width="40"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Box>
    </>
  );
}
