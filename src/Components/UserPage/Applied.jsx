import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../Firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import './Applied.css'; 
import Appbar from '../UserPage/Appbaar'
import Navbar from '../UserPage/Navbar'

export default function UserAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!userEmail) return; 

      setLoading(true);
      try {
        const appliedJobsCollection = collection(db, 'AppliedJobs');
        const q = query(appliedJobsCollection, where("email", "==", userEmail));
        const appliedJobsSnapshot = await getDocs(q);
        const jobsList = appliedJobsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppliedJobs(jobsList);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [userEmail]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(''); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    <Appbar />
    <Navbar />
    <div className="user-applied-jobs-container">
      <h1>Applied Jobs</h1>
      {loading ? (
        <div className="circular-progress">
          <CircularProgress />
        </div>
      ) : (
        <div className="user-applied-jobs-list">
          {appliedJobs.length === 0 ? (
            <p>You have not applied for any jobs.</p>
          ) : (
            appliedJobs.map((job) => (
              <Card key={job.id} className="mb-4">
                <Card.Body>
                  <Card.Title>{job.jobTitle}</Card.Title>
                  <Card.Text>{job.jobDescription}</Card.Text>
                  <Card.Text>Salary: {job.salary}</Card.Text>
                  <Card.Text className="status">Status: {job.status}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
}