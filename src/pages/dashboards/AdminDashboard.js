//newly added

// CHANGE: Added useState import for calendar state management
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";

import KPICard from "../../Components/dashboard/KPICard";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DashboardPieChart from "../../Components/dashboard/DashboardPieChart";
import DashboardBarChart from "../../Components/dashboard/DashboardBarChart";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import CalendarWidget from "../../Components/dashboard/CalendarWidget";
import RecentActivity from "../../Components/dashboard/RecentActivity";
import { getRecentActivities } from "../../services/dashboardService";

import "./AdminDashboard.css";

function AdminDashboard() {

  // CHANGE: Added state for calendar date selection to make calendar interactive
  const [selectedScheduleDate, setSelectedScheduleDate] = useState("2026-06-10");
  const navigate = useNavigate();
  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const pendingUsers =
    users.filter(
      (user) =>
        user.approvalStatus ===
        "Pending"
    );

    const activities = getRecentActivities();

  const pieData = [
    {
      name: "Approved",
      value:
        users.length -
        pendingUsers.length
    },
    {
      name: "Pending",
      value:
        pendingUsers.length
    }
  ];

  const studyData = [
    {
      name: "Jan",
      value: 4
    },
    {
      name: "Feb",
      value: 6
    },
    {
      name: "Mar",
      value: 8
    },
    {
      name: "Apr",
      value: 11
    },
    {
      name: "May",
      value: 12
    }
  ];

  const requestData =
    pendingUsers.map(
      (user) => ({
        name: user.name,
        email: user.email,
        role: user.role,
        status:
          user.approvalStatus
      })
    );

  const scheduleData = [
    {
      date: "2026-06-08",
      subjectId: "SUB-001",
      subjectName: "John Doe",
      visit: "Screening",
      status: "Completed",
      study: "TRIAL-001",
      site: "Site A",
      time: "10:00 AM"
    },
    {
      date: "2026-06-08",
      subjectId: "SUB-002",
      subjectName: "Jane Smith",
      visit: "Visit 1",
      status: "Scheduled",
      study: "TRIAL-001",
      site: "Site B",
      time: "02:00 PM"
    },
    {
      date: "2026-06-10",
      subjectId: "SUB-003",
      subjectName: "Mike Johnson",
      visit: "Visit 2",
      status: "Completed",
      study: "TRIAL-002",
      site: "Site A",
      time: "11:00 AM"
    },
    {
      date: "2026-06-10",
      subjectId: "SUB-001",
      subjectName: "John Doe",
      visit: "Visit 3",
      status: "Scheduled",
      study: "TRIAL-001",
      site: "Site A",
      time: "03:30 PM"
    },
    {
      date: "2026-06-15",
      subjectId: "SUB-004",
      subjectName: "Sarah Williams",
      visit: "End of Study",
      status: "Scheduled",
      study: "TRIAL-003",
      site: "Site C",
      time: "09:00 AM"
    },
    {
      date: "2026-06-20",
      subjectId: "SUB-005",
      subjectName: "Robert Brown",
      visit: "Follow-up",
      status: "Pending",
      study: "TRIAL-002",
      site: "Site B",
      time: "01:00 PM"
    }
  ];

  return (

    <DashboardLayout>

      <div className="admin-dashboard">

        <div className="dashboard-page-title">

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Clinical Trial System Overview
          </p>

        </div>

        {/* KPI ROW */}

        <div className="dashboard-grid-6">

          <KPICard
            title="Users"
            value={users.length}
            subtitle="Registered Users"
            icon="👤"
            onClick={() => navigate("/user-management")}
          />

          <KPICard
            title="Pending"
            value={
              pendingUsers.length
            }
            subtitle="Approval Requests"
            icon="🛡️"
            onClick={() => navigate("/permission-approval")}
          />

          <KPICard
            title="Studies"
            value="12"
            subtitle="Active Studies"
            icon="📁"
            onClick={() => navigate("/studies")}
          />

          <KPICard
            title="Sites"
            value="8"
            subtitle="Operational Sites"
            icon="🏥"
            onClick={() => navigate("/sites")}
          />

          <KPICard
            title="Queries"
            value="18"
            subtitle="Open Queries"
            icon="❓"
            onClick={() => navigate("/queries")}
          />

          <KPICard
            title="Compliance"
            value="95%"
            subtitle="Overall Score"
            icon="✅"
          />

        </div>

        {/* RECENT ACTIVITY */}
        <RecentActivity
          activities={activities}
        />

        {/* CHARTS */}

        <div className="dashboard-grid-2">

          <DashboardCard
            title="User Approval Status"
          >

            <DashboardPieChart
              data={pieData}
            />

          </DashboardCard>

          <DashboardCard
            title="Study Growth"
          >

            <DashboardBarChart
              data={studyData}
            />

          </DashboardCard>

        </div>

        {/* TABLE + CALENDAR */}

        <div className="dashboard-grid-2">

          <DashboardCard
            title="Pending Requests"
          >

            <DataTable
              columns={[
                {
                  key: "name",
                  label: "Name"
                },
                {
                  key: "email",
                  label: "Email"
                },
                {
                  key: "role",
                  label: "Role"
                },
                {
                  key: "status",
                  label: "Status"
                }
              ]}
              data={requestData}
            />

          </DashboardCard>

          <DashboardCard
            title="Calendar"
          >

            {/* CHANGE: Updated CalendarWidget to accept schedules data and date selection callbacks for full functionality */}
            <CalendarWidget
              schedules={scheduleData}
              selectedDate={selectedScheduleDate}
              onDateSelect={setSelectedScheduleDate}
            />

          </DashboardCard>

        </div>

        {/* ALERTS + ACTIONS */}

        <div className="dashboard-grid-2">

          <AlertsPanel
            title="System Alerts"
            alerts={[
              {
                type: "warning",
                title:
                  "Pending Approvals",
                message:
                  `${pendingUsers.length} users awaiting approval`
              },
              {
                type: "danger",
                title:
                  "Open Queries",
                message:
                  "18 unresolved queries"
              },
              {
                type: "info",
                title:
                  "Study Update",
                message:
                  "New protocol uploaded"
              }
            ]}
          />

          <QuickActions
            actions={[
              {
                icon: "👤",
                label:
                  "User Management",
                path:
                  "/user-management"
              },
              {
                icon: "🛡️",
                label:
                  "Approvals",
                path:
                  "/permission-approval"
              },
              {
                icon: "📁",
                label:
                  "Studies",
                path:
                  "/studies"
              },
              {
                icon: "📈",
                label:
                  "Reports",
                path:
                  "/reports"
              }
            ]}
          />

        </div>

      </div>

    </DashboardLayout>

  );
}

export default AdminDashboard;