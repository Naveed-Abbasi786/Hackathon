import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewAllEvent.css'; 
import Appbar from '../UserPage/Appbaar'
import Navbar from '../UserPage/Navbar'
const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Events'), (snapshot) => {
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEvents(eventsList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching events:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleJoinEvent = async (eventId) => {
    try {
      const eventDocRef = doc(db, 'Events', eventId);
      const eventSnapshot = await getDoc(eventDocRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data();
        let requests = eventData.requests || [];
        let requestStatuses = eventData.requestStatuses || {};

        if (!requests.includes(userEmail)) {
          requests.push(userEmail);
          requestStatuses[userEmail] = 'Pending'; 
          await updateDoc(eventDocRef, { requests, requestStatuses });
          toast.success('Join request sent to admin!');
        } else {
          toast.info('You have already requested to join this event.');
        }
      } else {
        console.error('Event not found');
        toast.error('Event not found');
      }
    } catch (error) {
      console.error('Error requesting to join event:', error);
      toast.error('Failed to send join request. Please try again.');
    }
  };

  const isEventExpired = (eventDate) => new Date(eventDate) < new Date();

  const expiredEvents = events.filter(event => isEventExpired(event.date));
  const upcomingEvents = events.filter(event => !isEventExpired(event.date));

  return (
    <>
    <Appbar />
    <Navbar />
    <div className="events-container">
      <h1>Events</h1>
      <ToastContainer />
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <div className="events-list">
            {upcomingEvents.length === 0 ? (
              <p>No upcoming events available</p>
            ) : (
              upcomingEvents.map(event => {
                const isRequested = event.requests?.includes(userEmail);
                const requestStatus = event.requestStatuses?.[userEmail] || 'Pending';
                const expired = isEventExpired(event.date);

                const buttonVariant = requestStatus === 'Rejected' ? 'danger' : 
                        requestStatus === 'Accepted' ? 'success' :
                        requestStatus === 'Pending' ? 'primary' :
                        'default'; 

                return (
                  <Card key={event.id} className={`mb-4 col-lg-4 ${expired ? 'expired-event' : ''}`}>
                    {event.imageUrl && <Card.Img variant="top" src={event.imageUrl} alt={event.title} />}
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>{event.description}</Card.Text>
                      <Card.Text>Date: {new Date(event.date).toLocaleDateString()}</Card.Text>
                      <Button 
                        onClick={() => handleJoinEvent(event.id)}
                        disabled={expired || isRequested}
                        variant={buttonVariant}
                      >
                        {isRequested ? requestStatus : expired ? 'Expired' : 'Request to Join'}
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </div>

          {expiredEvents.length > 0 && (
            <div className="expired-events-section">
              <h2>Expired Events</h2>
              <div className="events-list">
                {expiredEvents.map(event => (
                  <Card key={event.id} className="mb-4 col-lg-4 expired-event">
                    {event.imageUrl && <Card.Img variant="top" src={event.imageUrl} alt={event.title} />}
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>{event.description}</Card.Text>
                      <Card.Text>Date: {new Date(event.date).toLocaleDateString()}</Card.Text>
                      <Card.Text className="text-danger">Expired</Card.Text>
                      <Button disabled variant="secondary">
                        Expired
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default ViewEvents;
