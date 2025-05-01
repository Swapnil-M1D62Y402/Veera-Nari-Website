// import DashboardComponent from '@/components/dashboard';

// export default function Dashboard() {
//   return (
//     <div className="mx-auto">
//       <DashboardComponent/>
//     </div>
//   );
// }

"use client"

import DashboardComponent from '@/components/dashboard';
import FirstResponderDashboard from '@/components/firstResponderDashboard';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for user to be loaded from context
    if (user !== null) setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-white">Loading dashboard...</div>;
  }

  if (user?.userType === 'FIRST_RESPONDER') {
    return (
      <div className="mx-auto">
        <FirstResponderDashboard />
      </div>
    );
  }

  // Default: Youth, Trusted Contact, Consultant, etc.
  return (
    <div className="mx-auto">
      <DashboardComponent />
    </div>
  );
}