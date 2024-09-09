import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { auth, db } from '../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ApplyJobModal from '../UserPage/ApplyJob';
import { onAuthStateChanged } from 'firebase/auth';
import './ViewJob.css';
import Appbar from '../UserPage/Appbaar'
import Navbar from '../UserPage/Navbar'
export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userEmail) return;

      try {
        const jobsList = [];
        const categories = [
          'frontendJobs',
          'backendJobs',
          'uiuxJobs',
          'graphicDesignJobs'
        ];

        for (const category of categories) {
          const categoryCollection = collection(db, category);
          const categorySnapshot = await getDocs(categoryCollection);
          categorySnapshot.docs.forEach(doc => {
            jobsList.push({
              id: doc.id,
              category,
              ...doc.data()
            });
          });
        }

        const appliedJobsList = [];
        const appliedCollection = collection(db, "AppliedJobs");
        const appliedSnapshot = await getDocs(appliedCollection);
        appliedSnapshot.docs.forEach(doc => {
          if (doc.data()["email"] === userEmail) {
            appliedJobsList.push({
              id: doc.data()["jobId"],
            });
          }
        });

        const uniqueJobs = jobsList.filter(job => !appliedJobsList.some(appliedJob => appliedJob.id === job.id));

        console.log('Fetched Jobs:', uniqueJobs);
        setJobs(uniqueJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    fetchJobs();

    return () => unsubscribe();
  }, [userEmail]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setModalShow(true);
  };

  return (
     <>
    <Appbar />
    <Navbar />
    <div className="jobs-container">
      <h1>Jobs</h1>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="jobs-list">
          {jobs.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            jobs.map((job) => (
              <div className="card job-card mb-3" key={job.id} style={{ maxWidth: '540px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div className="card-body">
                  <h5 className="card-title">{job.jobTitle}</h5>
                  <p className="card-company-location text-muted">
                    Saylani Welfare - Hyderabad
                  </p>
                  <p className="job-card-description text-muted">
                    {job.jobDescription}
                  </p>
                  <p className="job-card-salary bg-light p-2 rounded text-dark fw-bold">
                    Salary: Rs {job.salary}
                  </p>
                  <div className="mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApplyClick(job)}
                    >
                      Apply for Job
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <ApplyJobModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        job={selectedJob}
      />
    </div>
    </>
  );
}
