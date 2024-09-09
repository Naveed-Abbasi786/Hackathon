import React, { useState } from 'react';
// import AddJob from '../AdminPage/AddJob';
// import ViewJobs from './ViewJobs';
// import AppliedJobs from './AppliedJobs';
// import AddEvent from './AddEvent';
// import ViewEvents from '../AdminPage/ViewEvents';
// import EventRequest from './EventRequest';
// import { Button } from 'react-bootstrap';
import Dashboard from '../Dashbord/dashboard'

export default function Admin() {
  const [showEvents, setShowEvents] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEventRequest, setShowEventRequest] = useState(false);
  const [showViewEvents, setShowViewEvents] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showViewJobs, setShowViewJobs] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  return (
    <div>
<Dashboard/>
    </div>
    // <div>
    //   <h1>Admin Dashboard</h1>

    //   <section>
    //     <h2>Events</h2>
    //     <Button onClick={() => setShowEvents(prev => !prev)}>
    //       {showEvents ? 'Hide Events' : 'Show Events'}
    //     </Button>
    //     {showEvents && (
    //       <div>
    //         <Button onClick={() => setShowAddEvent(prev => !prev)} className="mt-3">
    //           {showAddEvent ? 'Hide Add Event' : 'Show Add Event'}
    //         </Button>
    //         {showAddEvent && <AddEvent show={showAddEvent} onHide={() => setShowAddEvent(false)} />}

    //         <Button 
    //           onClick={() => setShowEventRequest(prev => !prev)} 
    //           className="mt-3"
    //         >
    //           {showEventRequest ? 'Hide Request Events' : 'Show Request Events'}
    //         </Button>
    //         {showEventRequest && <EventRequest />}

    //         <Button 
    //           onClick={() => setShowViewEvents(prev => !prev)} 
    //           className="mt-3"
    //         >
    //           {showViewEvents ? 'Hide View Events' : 'View Events'}
    //         </Button>
    //         {showViewEvents && <ViewEvents />}
    //       </div>
    //     )}
    //   </section>

    //   <section>
    //     <h2>Jobs</h2>
    //     <Button onClick={() => setShowJobs(prev => !prev)}>
    //       {showJobs ? 'Hide Jobs' : 'Show Jobs'}
    //     </Button>
    //     {showJobs && (
    //       <div>
    //           <AddJob />
    //           <ViewJobs />

    //         <Button onClick={() => setShowAppliedJobs(prev => !prev)} className="mt-3">
    //           {showAppliedJobs ? 'Hide Applied Jobs' : 'Show Applied Jobs'}
    //         </Button>
    //         {showAppliedJobs && <AppliedJobs />}
    //       </div>
    //     )}
    //   </section>
    // </div>
  );
}
