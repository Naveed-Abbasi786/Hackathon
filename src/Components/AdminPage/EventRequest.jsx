import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EventRequest.css'; // Custom CSS file

const ManageRequests = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Events'), (snapshot) => {
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter events to show only those with at least one request
      const eventsWithRequests = eventsList.filter(event => event.requests && event.requests.length > 0);

      // Sort by date descending
      eventsWithRequests.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEvents(eventsWithRequests);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching events:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRequestAction = async (eventId, email, action) => {
    try {
      const eventDocRef = doc(db, 'Events', eventId);
      const eventSnapshot = await getDoc(eventDocRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data();
        let requestStatuses = eventData.requestStatuses || {};

        if (action === 'accept') {
          requestStatuses[email] = 'Accepted';
        } else if (action === 'reject') {
          requestStatuses[email] = 'Rejected';
        }

        await updateDoc(eventDocRef, { requestStatuses });
        toast.success(`Request ${action}ed!`);
      } else {
        console.error('Event not found');
        toast.error('Event not found');
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      toast.error(`Failed to ${action} request. Please try again.`);
    }
  };

  return (
    <div className="admin-requests-container">
      <ToastContainer />
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div className="requests-list">
          {events.length === 0 ? (
            <p>No events with requests available</p>
          ) : (
            events.map(event => {
              const requests = event.requests || [];

              return (
                <div key={event.id} className="event-card d-flex">
                  <div className="event-content">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    {requests.length === 0 ? (
                      <p>No requests</p>
                    ) : (
                      requests.map(request => {
                        const status = event.requestStatuses[request];
                        const isDisabled = status === 'Accepted' || status === 'Rejected';

                        return (
                          <div key={request} className="request-item">
                            <p>Request :  {request}</p>
                            <Button 
                              onClick={() => handleRequestAction(event.id, request, 'accept')} 
                              variant="success" 
                              disabled={isDisabled && status === 'Accepted'}
                            >
                              Accept
                            </Button>
                            <Button 
                              onClick={() => handleRequestAction(event.id, request, 'reject')} 
                              variant="danger" 
                              className="ms-2"
                              disabled={isDisabled && status === 'Rejected'}
                            >
                              Reject
                            </Button>
                            {status && <p>Status: {status}</p>}
                          </div>
                        );
                      })
                    )}
                  </div>
                  {event.imageUrl && (
                    <div className="event-image">
                      <img src={event.imageUrl} alt={event.title} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
