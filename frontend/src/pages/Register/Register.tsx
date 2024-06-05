import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, error } from "./registerStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services/index.service";

// Define the interface for form values
interface FormValues {
  email: string;
  password: string;
  name: string;
}





const Register: FC = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("name is required")
  });


  const navigate = useNavigate();


  // Define form submit handler
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    console.log(values);
    registerService(values, toast, navigate);
    setSubmitting(false);
  };

  return (
    <Container className="mx-auto max-w-md space-y-6">
      <ToastContainer />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Registration</h1>
        <p className="text-gray-500 ">
          Enter your details to get started.
        </p>
      </div>
      {/* Formik form wrapper */}
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Render form inside Formik */}
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            {/* name input field */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Field type="text" name="name" as={Form.Control} />
              <ErrorMessage
                name="name"
                component={error}
              />
            </Form.Group>
            {/* Email input field */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field type="email" name="email" as={Form.Control} />
              <ErrorMessage
                name="email"
                component={error}
              />
            </Form.Group>
            {/* Password input field */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field type="password" name="password" as={Form.Control} />
              <ErrorMessage
                name="password"
                component={error}
              />
            </Form.Group>
            {/* Submit button */}
            <div className="d-flex">
              <Button type="submit" className="w-full">
                create account
              </Button>
              <span className="ms-3 btn"
                style={{ border: "none", fontSize: "14px" }}
                onClick={() => navigate("/login")}
              >Have an account already</span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;