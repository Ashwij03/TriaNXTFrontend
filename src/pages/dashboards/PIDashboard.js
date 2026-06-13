//newly added

// CHANGE: Added useState import for calendar state management
import { useState } from "react";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";

import KPICard from "../../Components/dashboard/KPICard";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import CalendarWidget from "../../Components/dashboard/CalendarWidget";

import "./PIDashboard.css";

function PIDashboard() {

  // CHANGE: Added state for calendar date selection to make calendar interactive
  const [selectedScheduleDate, setSelectedScheduleDate] = useState("2026-06-10");

  const recentSubjects = [
    {
      subjectId: "SUB-001",
      status: "Active",
      lastVisit: "Visit 2"
    },
    {
      subjectId: "SUB-002",
      status: "Screening",
      lastVisit: "Visit 1"
    },
    {
      subjectId: "SUB-003",
      status: "Active",
      lastVisit: "Visit 1"
    }
  ];

  const upcomingVisits = [
    {
      subjectId: "SUB-001",
      visit: "Visit 3",
      date: "10-Jun-2026"
    },
    {
      subjectId: "SUB-002",
      visit: "Visit 2",
      date: "12-Jun-2026"
    }
  ];

  const pendingQueries = [
    {
      queryId: "Q-101",
      subjectId: "SUB-001",
      status: "Open"
    },
    {
      queryId: "Q-102",
      subjectId: "SUB-002",
      status: "Open"
    }
  ];

  // CHANGE: Added sample schedule data for calendar widget to display events
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
      date: "2026-06-12",
      subjectId: "SUB-002",
      subjectName: "Jane Smith",
      visit: "Visit 2",
      status: "Scheduled",
      study: "TRIAL-001",
      site: "Site A",
      time: "02:00 PM"
    },
    {
      date: "2026-06-15",
      subjectId: "SUB-003",
      subjectName: "Mike Johnson",
      visit: "Visit 1",
      status: "Scheduled",
      study: "TRIAL-001",
      site: "Site A",
      time: "09:00 AM"
    },
    {
      date: "2026-06-18",
      subjectId: "SUB-001",
      subjectName: "John Doe",
      visit: "Follow-up",
      status: "Pending",
      study: "TRIAL-001",
      site: "Site A",
      time: "11:00 AM"
    }
  ];

  return (

    <DashboardLayout>

      <div className="pi-dashboard">

        <div className="dashboard-page-title">

          <h1>
            Principal Investigator Dashboard
          </h1>

          <p>
            Site Overview and Study Progress
          </p>

        </div>

        {/* KPI ROW */}

        <div className="dashboard-grid-6">

          <KPICard
            title="Enrollment Count"
            value="120"
            subtitle="Target: 150"
            icon="👥"
          />

          <KPICard
            title="Active Subjects"
            value="85"
            subtitle="Currently Active"
            icon="🟢"
          />

          <KPICard
            title="Pending Tasks"
            value="12"
            subtitle="Need Attention"
            icon="📋"
          />

          <KPICard
            title="Overdue Documents"
            value="3"
            subtitle="Immediate Action"
            icon="📄"
          />

          <KPICard
            title="Visit Completion"
            value="92%"
            subtitle="Completed"
            icon="📈"
          />

          <KPICard
            title="Consent Rate"
            value="88%"
            subtitle="Approved"
            icon="✅"
          />

        </div>

        {/* ANALYTICS ROW */}

        <div className="dashboard-grid-4">

          <DashboardCard title="Enrollment vs Target">

            <div className="fake-chart">

              120 / 150

            </div>

          </DashboardCard>

          <DashboardCard title="Visit Completion %">

            <div className="fake-chart">

              Visit Metrics

            </div>

          </DashboardCard>

          <DashboardCard title="Consent Distribution">

            <div className="fake-chart">

              Consent Statistics

            </div>

          </DashboardCard>

          <DashboardCard title="Subject Status">

            <div className="fake-chart">

              Subject Overview

            </div>

          </DashboardCard>

        </div>

        {/* TABLES */}

        <div className="dashboard-grid-4">

          <DashboardCard title="Recent Subjects">

            <DataTable
              columns={[
                {
                  key: "subjectId",
                  label: "Subject ID"
                },
                {
                  key: "status",
                  label: "Status"
                },
                {
                  key: "lastVisit",
                  label: "Last Visit"
                }
              ]}
              data={recentSubjects}
            />

          </DashboardCard>

          <DashboardCard title="Upcoming Visits">

            <DataTable
              columns={[
                {
                  key: "subjectId",
                  label: "Subject ID"
                },
                {
                  key: "visit",
                  label: "Visit"
                },
                {
                  key: "date",
                  label: "Date"
                }
              ]}
              data={upcomingVisits}
            />

          </DashboardCard>

          <DashboardCard title="Pending Queries">

            <DataTable
              columns={[
                {
                  key: "queryId",
                  label: "Query ID"
                },
                {
                  key: "subjectId",
                  label: "Subject"
                },
                {
                  key: "status",
                  label: "Status"
                }
              ]}
              data={pendingQueries}
            />

          </DashboardCard>

          <DashboardCard title="Calendar">

            {/* CHANGE: Updated CalendarWidget to accept schedules data and date selection callbacks for full functionality */}
            <CalendarWidget
              schedules={scheduleData}
              selectedDate={selectedScheduleDate}
              onDateSelect={setSelectedScheduleDate}
            />

          </DashboardCard>

        </div>

        {/* BOTTOM ROW */}

        <div className="dashboard-grid-2">

          <AlertsPanel
            title="Alerts & Notifications"
            alerts={[
              {
                type: "danger",
                title:
                  "3 Documents Overdue",
                message:
                  "Please review and take action"
              },
              {
                type: "warning",
                title:
                  "12 Tasks Pending",
                message:
                  "Click to view tasks"
              },
              {
                type: "info",
                title:
                  "Upcoming Visit",
                message:
                  "SUB-001 Visit 3"
              }
            ]}
          />

          <QuickActions
            actions={[
              {
                icon: "👤",
                label: "Add Subject"
              },
              {
                icon: "📅",
                label: "Schedule Visit"
              },
              {
                icon: "📄",
                label: "Upload Document"
              },
              {
                icon: "❓",
                label: "Create Query"
              },
              {
                icon: "📊",
                label: "Generate Report"
              }
            ]}
          />

        </div>

      </div>

    </DashboardLayout>

  );
}

export default PIDashboard;