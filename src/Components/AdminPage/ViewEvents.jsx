import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner, Modal } from 'react-bootstrap';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showExpiredEvents, setShowExpiredEvents] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsCollection = collection(db, 'Events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCloseDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'Events', eventId));
      setEvents(events.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully!', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event. Try again later.', {
        position: 'top-right',
      });
    }
  };

  const isEventExpired = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };

  const daysUntilEvent = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    const timeDiff = eventDateObj - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  return (
    <div className="view-events-container">
      
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* Show button after loading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Events</h1>
            <Button 
              variant="primary" 
              onClick={() => setShowExpiredEvents(!showExpiredEvents)}
              className="mb-3 mt-3"
            >
              {showExpiredEvents ? 'Show  Events' : 'Show Expired Events'}
            </Button>
          </div>
          
          <div className="events-list">
            {events.length === 0 ? (
              <p>No events available</p>
            ) : (
              <>
                {/* Reorder events based on the "Show Expired Events" toggle */}
                <div className="active-events d-flex gap-4 flex-wrap">
                  {showExpiredEvents
                    ? events
                        .filter(event => isEventExpired(event.date))
                        .concat(events.filter(event => !isEventExpired(event.date))) // Show expired first
                        .map(event => (
                          <Card key={event.id} className="mb-4 col-lg-4">
                            <Card.Body>
                              {event.imageUrl && <Card.Img variant="top" src={event.imageUrl} />}
                              <Card.Title>{event.title}</Card.Title>
                              <Card.Text>{event.description}</Card.Text>
                              <Card.Text>
                                Date: {new Date(event.date).toLocaleDateString()} 
                                {isEventExpired(event.date) ? ' (Expired)' : ` (${daysUntilEvent(event.date)} days left)`}
                              </Card.Text>
                              <Button variant="primary" onClick={() => handleShowDetails(event)}>
                                View Details
                              </Button>
                              <Button variant="danger" onClick={() => handleDeleteEvent(event.id)} className="ml-2">
                                Delete
                              </Button>
                            </Card.Body>
                          </Card>
                        ))
                    : events
                        .filter(event => !isEventExpired(event.date))
                        .map(event => (
                          <Card key={event.id} className="mb-4 col-lg-4">
                            <Card.Body>
                              {event.imageUrl && <Card.Img variant="top" src={event.imageUrl} />}
                              <Card.Title>{event.title}</Card.Title>
                              <Card.Text>{event.description}</Card.Text>
                              <Card.Text>
                                Date: {new Date(event.date).toLocaleDateString()} 
                                {daysUntilEvent(event.date) === 0 ? ' (Today)' : ` (${daysUntilEvent(event.date)} days left)`}
                              </Card.Text>
                              <Button variant="primary" onClick={() => handleShowDetails(event)}>
                                View Details
                              </Button>
                              <Button variant="danger" onClick={() => handleDeleteEvent(event.id)} className="ml-2">
                                Delete
                              </Button>
                            </Card.Body>
                          </Card>
                        ))
                  }
                </div>
              </>
            )}
          </div>
        </>
      )}

      {selectedEvent && (
        <Modal show={showEventDetails} onHide={handleCloseDetails} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent.imageUrl && <img src={selectedEvent.imageUrl} alt="Event" style={{ width: '100%' }} />}
            <h5>Description:</h5>
            <p>{selectedEvent.description}</p>
            <h5>Date:</h5>
            <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ViewEvents;
