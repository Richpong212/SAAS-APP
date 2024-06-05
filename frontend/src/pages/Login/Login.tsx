import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, error } from "./loginStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginService } from "../../services/index.service";
import { useNavigate } from "react-router-dom";


// Define the interface for form values
interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  // Define form submit handler
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    console.log(values);
    loginService(values, toast, navigate);
    setSubmitting(false);
  };

  return (
    <Container className="mx-auto max-w-md space-y-6">
      <ToastContainer />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login in</h1>
        <p className="text-gray-500 ">
          Enter your details to get started.
        </p>
      </div>
      {/* Formik form wrapper */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Render form inside Formik */}
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;