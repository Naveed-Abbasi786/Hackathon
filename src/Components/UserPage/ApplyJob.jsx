import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged } from 'firebase/auth';

function ApplyJobModal({ show, onHide, job, fetchJobs }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const LoggedIn =false;
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const unloggedIn = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        LoggedIn(true);
      } else {
        LoggedIn(false);
        setEmail('');
      }
    });
    return () => unloggedIn();
  }, []);

  const handleApplyJob = async () => {
    setIsLoading(true);

    if (!emailConfirmed) {
      toast.error('Please confirm your email address.');
      setIsLoading(false);
      return;
    }

    try {
      let picUrl = '';
      if (pic) {
        const picRef = ref(storage, `profilePictures/${Date.now()}_${pic.name}`);
        await uploadBytes(picRef, pic);
        picUrl = await getDownloadURL(picRef);
      }

      await addDoc(collection(db, 'AppliedJobs'), {
        jobId: job.id,
        name,
        email,
        pic: picUrl,
        status: 'Pending',
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        salary: job.salary
      });

      toast.success('Job application submitted successfully!');
      setName('');
      setPic(null);
      setEmailConfirmed(false);
      setIsApplied(true);

      fetchJobs();

      setTimeout(() => {
        onHide();
      }, 2000);
    } catch (error) {
      toast.error('Error applying for the job: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="email-confirmation" className="mt-3">
            <Form.Check
              type="checkbox"
              label="I confirm that this is my email address"
              checked={emailConfirmed}
              onChange={(e) => setEmailConfirmed(e.target.checked)}
              required
            />
          </Form.Group>

          <Form.Group controlId="pic" className="mt-3">
            <Form.Label>Your Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPic(e.target.files[0])}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleApplyJob} 
          disabled={isLoading} 
        >
          {isLoading ? <CircularProgress color='white' size={27} /> : isApplied ? 'Applied' : 'Apply Now'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApplyJobModal;
