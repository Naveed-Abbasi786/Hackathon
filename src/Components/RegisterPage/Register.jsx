import React, { useState } from 'react';
import './Register.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = (values) => {
    createUserWithEmailAndPassword(auth, values.emailCheck, values.passwordCheck)
      .then(async (userCredential) => {
        setLoading(true);

        const userData = {
          name: values.name,
          email: values.emailCheck,
          password: values.passwordCheck,
        };

        try {
          await addDoc(collection(db, "SignUpAccounts"), userData);

          notifySuccess('User signed up successfully');
          setLoading(false);

          setTimeout(() => {
            navigate('/SignIn'); 
          }, 1500);
        } catch (error) {
          setLoading(false);
          notifyError('Failed to save user data to Firestore');
          console.error("Error adding document: ", error);
        }
      })
      .catch((error) => {
        setLoading(false);
        notifyError(error.message);
        console.error(error);
      });
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='register'>
        <h2>Create <span>Account</span> </h2>
        <Formik
          initialValues={{ name: '', emailCheck: '', passwordCheck: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required")
              .min(4, 'Must be at least 4 characters')
              .max(10, 'Must be at most 10 characters'),
            emailCheck: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            passwordCheck: Yup.string()
              .min(6, 'Must be at least 6 characters')
              .max(10, 'Must be at most 10 characters')
              .required('Password is required'),
          })}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                <Form.Control
                  type="email"
                  name="emailCheck"
                  placeholder="Enter your email"
                  value={values.emailCheck}
                  onChange={handleChange}
                  isInvalid={!!errors.emailCheck && touched.emailCheck}
                />
                <Form.Control.Feedback type="invalid">{errors.emailCheck}</Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  name="passwordCheck"
                  placeholder="Enter your password"
                  value={values.passwordCheck}
                  onChange={handleChange}
                  isInvalid={!!errors.passwordCheck && touched.passwordCheck}
                />
                <Form.Control.Feedback type="invalid">{errors.passwordCheck}</Form.Control.Feedback>
              </FloatingLabel>

              <div className="Register-options">
                <Form.Check type="checkbox" label="Remember Me" className="Checkbox" />
              </div>

              <Button variant="primary" type="submit" className="register-button ">
                {loading ? <CircularProgress color='white' size={27}  /> : 'Sign Up'}
              </Button>
            </form>
          )}
        </Formik>

        <p className='signup-link'>Already have an account? <Link to="/SignIn">Sign In</Link></p>
      </div>
    </div>
  );
}
