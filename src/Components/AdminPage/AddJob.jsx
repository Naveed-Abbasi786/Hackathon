import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

function AddJobModal(props) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddJob = async () => {
    setIsLoading(true);

    if (!jobTitle || !jobDescription || !salary || !category) {
      toast.error('Please fill out all fields and select a category.', {
        position: "top-right",
        autoClose: 2000,
      });
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, category), {
        jobTitle,
        jobDescription,
        salary,
        category
      });

      await addDoc(collection(db, 'allJobs'), {
        jobTitle,
        jobDescription,
        salary,
        category
      });

      toast.success('Job added successfully!', {
        position: "top-right",
        autoClose: 2000,
      });

      setJobTitle('');
      setJobDescription('');
      setSalary('');
      setCategory('');
      props.onHide(); 
    } catch (error) {
      toast.error('Error adding job: ' + error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" >
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>Add Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="jobDescription" className="mt-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter job description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="salary" className="mt-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Job Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="frontendJobs">Frontend Developer</option>
              <option value="backendJobs">Backend Developer</option>
              <option value="uiuxJobs">UI/UX Designer</option>
              <option value="graphicDesignJobs">Graphic Designer</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleAddJob} 
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Save Job'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddJobModal;
