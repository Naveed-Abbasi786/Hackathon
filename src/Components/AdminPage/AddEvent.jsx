import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventModal = ({ show, onHide }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';

      // Upload image if a file is selected
      if (imageFile) {
        const imageRef = ref(storage, `events/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref); // Get the download URL for the image
      }

      // Add event data to Firestore
      const eventsCollection = collection(db, 'Events');
      await addDoc(eventsCollection, {
        title,
        description,
        date,
        imageUrl, // Save image URL to Firestore
      });

      setTitle('');
      setDescription('');
      setDate('');
      setImageFile(null);

      toast.success('Event added successfully!', {
        position: 'top-right',  
      });

      onHide(); // Close the modal
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event. Try again later.', {
        position: 'top-right',  
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#007bff', fontWeight: 'bold' }}>Add New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEventTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ borderRadius: '5px' }}
            />
          </Form.Group>

          <Form.Group controlId="formEventDescription" className="mt-3">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Provide a brief description of the event"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ borderRadius: '5px' }}
            />
          </Form.Group>

          <Form.Group controlId="formEventDate" className="mt-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ borderRadius: '5px' }}
            />
          </Form.Group>

          <Form.Group controlId="formEventImage" className="mt-3">
            <Form.Label>Upload Event Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
              style={{ borderRadius: '5px' }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              style={{ borderRadius: '5px' }}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Add Event'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEventModal;
