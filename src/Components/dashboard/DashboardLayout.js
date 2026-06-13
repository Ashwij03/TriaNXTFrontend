//newly added

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import "./DashboardLayout.css";
import "./dashboard.css";

function DashboardLayout({
  children
}) {

  return (

    <div className="dashboard-shell">

      <DashboardSidebar />

      <div className="dashboard-main">

        <DashboardHeader />

        <div className="dashboard-content">

          {children}

        </div>

      </div>

    </div>

  );
}

export default DashboardLayout;