import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import "./formRegister.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function FormRegister() {
  let initialValuesForm = {
    name: "", //este valor es referente al name del input pasra que formik sepa donde tiene que cambiar con el onchange por eso tiene que ser igual
    email: "",
    password: "",
    location: "",
    gener: "",
    age: "",
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Debes ingrensar un nombre"),
    email: Yup.string().required("Debes ingrensar un email"),
    password: Yup.string().required("Debes ingrensar un password"),
    gener: Yup.string().required("Debes ingrensar un genero"),
    age: Yup.string().required("Debes ingrensar una edad"),
    location: Yup.string().required("Debes ingrensar un ubicacion"),
  });

  const handleSubmitMy = (data) => {
    //esta es todo lo qeu cambio en el inicio value
    // este handle es mi funcion la que llamo en el form es una funcion propia de formik que accedo al onSubmit
    console.log(data);
  };

  const { handleChange, handleSubmit, setFieldValue, values, errors } =
    useFormik({
      //destructuring de formik
      //primero recibe los valores iniciales
      initialValues: initialValuesForm,
      //SEGUNDA PROPIEDAD Recibe el onSUbmit
      onSubmit: handleSubmitMy,
      //validacion
      validationSchema: registerSchema,
    });
  return (
    <div className="form-container">
      <Box
        onSubmit={handleSubmit}
        component="form"
        height={900}
        width={600}
        m={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        alignContent="center"
        gap={4}
        p={2}
        sx={{ borderRadius: "10px", boxShadow: 5 }}
        bgcolor="white"
      >
        <Typography
          color="primary"
          variant="h6"
          textAlign="left"
          fontWeight="bold"
        >
          1. To match you well we need some information
        </Typography>

        <Grid item>
          <TextField
            id="gener"
            type="text"
            name="gener"
            label="insert gener"
            variant="outlined"
            fullWidth
            value={values.gener}
            onChange={handleChange}
            error={!!errors.gener}
            helperText={errors.gener}
          />
        </Grid>

        <Grid item>
          <Typography component="p"> What's your age ?</Typography>
          <TextField
            id="age"
            type="text"
            name="age"
            label="Age"
            variant="outlined"
            fullWidth
            value={values.age}
            onChange={handleChange}
            error={errors.age}
            helperText={errors.age}
          />
        </Grid>

        <Box component="div">
          <Typography component="p">Where do you want to Dancing?</Typography>
          <TextField
            id="location"
            name="location"
            type="text"
            label="location"
            variant="outlined"
            fullWidth
            value={values.location}
            onChange={handleChange}
            error={errors.location}
            helperText={errors.location}
          />
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          justifyItems="space-evenly"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Grid item xs={12} md={9}>
            <Typography component="p">What is your first name?</Typography>
            <TextField
              id="nameRegister"
              type="text"
              label="name"
              variant="outlined"
              fullWidth
              //   name="name"
              value={values.name} //necesito el value pero no el name apra setfiel
              onChange={(e) => {
                setFieldValue("name", e.target.value); //PARA RECOGER VALORES DE TARGET
              }}
              error={errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography
              color="primary"
              variant="h6"
              align="left"
              fontWeight="bold"
            >
              2. Almost done. How do you want to log in?
            </Typography>
            <TextField
              id="emailRegister"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TextField
              id="passRegister"
              type="password"
              label="password"
              variant="outlined"
              fullWidth
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </div>
  );
}