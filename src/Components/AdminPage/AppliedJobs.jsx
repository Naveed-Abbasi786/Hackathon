import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null); // To track updating status for a specific job

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const appliedJobsCollection = collection(db, 'AppliedJobs');
        const appliedJobsSnapshot = await getDocs(appliedJobsCollection);
        const jobsList = appliedJobsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort jobs so that new jobs (not yet processed) are at the top
        jobsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAppliedJobs(jobsList);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    setUpdating(jobId); // Mark this job as being updated
    try {
      const jobDocRef = doc(db, 'AppliedJobs', jobId);
      await updateDoc(jobDocRef, { status: newStatus });
      // Update the status locally without refreshing the list
      setAppliedJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error('Error updating job status:', error);
    } finally {
      setUpdating(null); // Reset updating state
    }
  };

  return (
    <div className="admin-applied-jobs-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="admin-applied-jobs-list">
          {appliedJobs.length === 0 ? (
            <p>No job applications found.</p>
          ) : (
            appliedJobs.map((job) => (
              <Card key={job.id} className="mb-4">
                <Card.Body>
                  <Card.Title>{job.jobTitle}</Card.Title>
                  <Card.Text>{job.jobDescription}</Card.Text>
                  <Card.Text>Salary: {job.salary}</Card.Text>
                  <Card.Text>Status: {job.status}</Card.Text>
                  <Card.Text>Applicant Email: {job.email}</Card.Text>
                  <Button 
                    variant="success" 
                    onClick={() => handleStatusChange(job.id, 'Accepted')}
                    disabled={job.status === 'Accepted' || updating === job.id} // Disable button if job is updating or already accepted
                  >
                    {updating === job.id ? 'Updating...' : 'Accept'}
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleStatusChange(job.id, 'Rejected')}
                    className="ms-2"
                    disabled={job.status === 'Rejected' || updating === job.id} // Disable button if job is updating or already rejected
                  >
                    {updating === job.id ? 'Updating...' : 'Reject'}
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
