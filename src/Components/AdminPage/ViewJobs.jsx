import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../Firebase/firebaseConfig'; // Ensure correct Firebase config path
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './ViewJobs.css'; // Add custom CSS for layout and styling

export default function ViewAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showJobs, setShowJobs] = useState(true);

  const categories = [
    'all',
    'frontendJobs',
    'backendJobs',
    'uiuxJobs',
    'graphicDesignJobs',
  ];

  // Fetch jobs from all categories
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading spinner
      try {
        const jobsList = [];
        for (const category of categories.slice(1)) { // Exclude 'all' category from fetching
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

        setJobs(jobsList); // Store jobs in state
        setFilteredJobs(jobsList); // Initialize filteredJobs to show all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    if (showJobs) {
      fetchJobs(); // Only fetch jobs when the user clicks to view jobs
    }
  }, [showJobs]);

  // Handle job deletion
  const deleteJob = async (category, id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteDoc(doc(db, category, id)); // Delete job from Firestore
        
        // Optimistically update the jobs in state
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
        setFilteredJobs(prevJobs => 
          prevJobs.filter(job => (selectedCategory === 'all' || job.category === selectedCategory) && job.id !== id)
        );
        
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  // Filter jobs based on category
  const handleFilter = (category) => {
    setSelectedCategory(category);
    setFilteredJobs(jobs.filter(job => category === 'all' || job.category === category));
  };

  return (
    <div className="jobs-container">
      <div className="filter-buttons">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleFilter(category)}
            className="me-2"
            variant={selectedCategory === category ? 'primary' : 'secondary'}
          >
            {category === 'all' ? 'All Jobs' : category.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </Button>
        ))}
      </div>

      {loading && <CircularProgress size={24} />}

      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="job-card">
              <Card.Body>
                <div className="job-header">
                  <div>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    {/* <Card.Subtitle className="mb-2  text-muted">
                     Saylani Welfare
                    </Card.Subtitle> */}
                  </div>
                </div>
                <Card.Text>{job.jobDescription}</Card.Text>
                <div className="job-footer">
                  <span className="job-salary">{job.salary}</span>
                  <Card.Link
                    onClick={() => deleteJob(job.category, job.id)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  >
                    Delete 
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No jobs available in this category.</p>
        )}
      </div>
    </div>
  );
}
