"use client"
import DashboardComponent from '@/components/dashboard';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import ConsultantDashboard from '@/components/consultantDashboard';

// export default function Dashboard() {
//   return (
//     <div className="mx-auto">
//       <DashboardComponent/>
//     </div>
//   );
// }


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

  if (user?.userType === 'CONSULTANT') {
    return (
      <div className="mx-auto">
        <ConsultantDashboard />
      </div>
    );
  }

  // Default: Youth, Trusted Contact, etc.
  return (
    <div className="mx-auto">
      <DashboardComponent />
    </div>
  );
}
