//newly added

import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import KPICard from "../../Components/dashboard/KPICard";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import RecentActivity from "../../Components/dashboard/RecentActivity";
import { getRecentActivities } from "../../services/dashboardService";

import "./SiteStaffDashboard.css";

function SiteStaffDashboard() {

  const upcomingVisits = [
    {
      subjectId: "SUB-1001",
      visit: "Visit 3",
      date: "2026-06-10",
    },
    {
      subjectId: "SUB-1002",
      visit: "Screening",
      date: "2026-06-11",
    },
  ];

  const subjectActivity = [
    {
      subjectId: "SUB-1001",
      status: "Enrolled",
      site: "Site A",
    },
    {
      subjectId: "SUB-1002",
      status: "Screening",
      site: "Site A",
    },
    {
      subjectId: "SUB-1003",
      status: "Follow Up",
      site: "Site B",
    },
  ];

  const navigate = useNavigate();

  const activities = getRecentActivities();

  return (

    <DashboardLayout>

      <div className="site-dashboard">

        <div className="dashboard-title-section">

          <h1>
            Site Staff Dashboard
          </h1>

          <p>
            Site Operations Overview
          </p>

        </div>

        {/* KPI SECTION */}

        <div className="kpi-grid">

          <KPICard
            title="Screening"
            value="18"
            subtitle="Subjects in Screening"
            icon="🔍"
            onClick={() => navigate("/screening")}
          />
            
          <KPICard
            title="Enrollment"
            value="42"
            subtitle="Active Enrollment"
            icon="➕"
            onClick={() => navigate("/enrollment")}
          />
            
          <KPICard
            title="Upcoming Visits"
            value="12"
            subtitle="Next 7 Days"
            icon="📅"
            onClick={() => navigate("/visits")}
          />
            
          <KPICard
            title="Open Queries"
            value="5"
            subtitle="Pending Resolution"
            icon="❓"
            onClick={() => navigate("/queries")}
          />

        </div>

        <RecentActivity
          activities={activities}
        />

        {/* QUICK ACTIONS */}

        <QuickActions
          actions={[
            {
              icon: "👥",
              label: "Subjects",
              path: "/subjects",
            },
            {
              icon: "🔍",
              label: "Screening",
              path: "/screening",
            },
            {
              icon: "➕",
              label: "Enrollment",
              path: "/enrollment",
            },
            {
              icon: "📅",
              label: "Visits",
              path: "/visits",
            },
          ]}
        />

        {/* ALERTS + VISITS */}

        <div className="dashboard-split">

          <AlertsPanel
            title="Site Alerts"
            alerts={[
              {
                type: "warning",
                title: "Upcoming Visit",
                message:
                  "3 visits scheduled tomorrow",
              },
              {
                type: "danger",
                title: "Open Query",
                message:
                  "Subject SUB-1003 requires review",
              },
            ]}
          />

          <DataTable
            title="Upcoming Visits"
            columns={[
              {
                key: "subjectId",
                label: "Subject ID",
              },
              {
                key: "visit",
                label: "Visit",
              },
              {
                key: "date",
                label: "Date",
              },
            ]}
            data={upcomingVisits}
          />

        </div>

        {/* SUBJECT ACTIVITY */}

        <DataTable
          title="Subject Activity"
          columns={[
            {
              key: "subjectId",
              label: "Subject ID",
            },
            {
              key: "status",
              label: "Status",
            },
            {
              key: "site",
              label: "Site",
            },
          ]}
          data={subjectActivity}
        />

      </div>

    </DashboardLayout>

  );
}

export default SiteStaffDashboard;