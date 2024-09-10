import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../Firebase/firebaseConfig'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './ViewJobs.css'; 

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

  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); 
      try {
        const jobsList = [];
        for (const category of categories.slice(1)) { 
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

        setJobs(jobsList); 
        setFilteredJobs(jobsList); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (showJobs) {
      fetchJobs(); 
    }
  }, [showJobs]);

  const deleteJob = async (category, id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteDoc(doc(db, category, id)); // Delete job from Firestore
    
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
