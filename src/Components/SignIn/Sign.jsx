import React, { useState } from 'react';
import './Sign.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = async (values) => {
    setLoading(true); 
  
    try {
       await signInWithEmailAndPassword(auth, values.emailCheck, values.passwordCheck);
  
      notifySuccess("Login Successfully");
  
      if (values.emailCheck === 'admin@admin.com') {
        setTimeout(() => {
          navigate('/Admin');  
        }, 1500);
      } else {
        setTimeout(() => {
          navigate('/User');  
        }, 1500);
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      notifyError(`Please Check and Email Password`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='container'>
      <ToastContainer />
      <div className='signin'>
        <h2>Sign <span>In
          </span></h2>
        <Formik
          initialValues={{ emailCheck: '', passwordCheck: '' }}
          validationSchema={Yup.object({
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
              <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
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

              <div className='signin-options'>
                <Form.Check type="checkbox" label="Remember Me" className='Checkbox' />
                <a  className='forgot-password'>Forgot Password</a>
              </div>

              <Button variant="primary" className='signin-button' type="submit" disabled={loading}>
                {loading ? <CircularProgress color='white' size={27} /> : 'Sign In'}
              </Button>

              <p className='signup-link'>Don't have an account? <Link to="/Register">Sign Up</Link></p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
