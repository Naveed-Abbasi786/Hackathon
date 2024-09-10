import React, { useState } from 'react';
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
      );
}
