// UPDATED: PI dashboard wired to adminService dynamic data

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import VisitCalendarSection from "../../Components/dashboard/VisitCalendarSection";
import { getPIDashboardData } from "../../services/adminService";

import "../Admin/Dashboard.css";
import "./Dashboard.css";

function PIDashboard() {
  const dashboardData = getPIDashboardData();
  const {
    enrollmentCount,
    enrollmentTarget,
    activeSubjects,
    pendingTasks,
    overdueDocuments,
    visitCompletion,
    consentRate,
    recentSubjects,
    pendingComments,
    alerts
  } = dashboardData;

  return (
    <DashboardLayout>
      <div className="pi-dashboard">
        <div className="dashboard-page-title">
          <h1>Principal Investigator Dashboard</h1>
          <p>Site Overview and Study Progress</p>
        </div>

        <div className="dashboard-grid-6">
          <KPICard
            title="Enrollment Count"
            value={enrollmentCount}
            subtitle={`Target: ${enrollmentTarget}`}
            icon="👥"
          />

          <KPICard
            title="Active Subjects"
            value={activeSubjects}
            subtitle="Currently Active"
            icon="🟢"
          />

          <KPICard
            title="Pending Tasks"
            value={pendingTasks}
            subtitle="Need Attention"
            icon="📋"
          />

          <KPICard
            title="Overdue Documents"
            value={overdueDocuments}
            subtitle="Immediate Action"
            icon="📄"
          />

          <KPICard
            title="Visit Completion"
            value={visitCompletion}
            subtitle="Completed"
            icon="📈"
          />

          <KPICard
            title="Consent Rate"
            value={consentRate}
            subtitle="Approved"
            icon="✅"
          />
        </div>

        <div className="dashboard-grid-4">
          <DashboardCard title="Enrollment vs Target">
            <div className="fake-chart">
              {enrollmentCount} / {enrollmentTarget}
            </div>
          </DashboardCard>

          <DashboardCard title="Visit Completion %">
            <div className="fake-chart">{visitCompletion}</div>
          </DashboardCard>

          <DashboardCard title="Consent Distribution">
            <div className="fake-chart">{consentRate} consented</div>
          </DashboardCard>

          <DashboardCard title="Subject Status">
            <div className="fake-chart">
              {activeSubjects} active subjects
            </div>
          </DashboardCard>
        </div>

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

          <DashboardCard title="Pending Comments">
            <DataTable
              columns={[
                {
                  key: "commentId",
                  label: "Comment ID"
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
              data={pendingComments}
            />
          </DashboardCard>
        </div>

        <VisitCalendarSection />

        <div className="dashboard-grid-2">
          <AlertsPanel title="Alerts & Notifications" alerts={alerts} />

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
                icon: "💬",
                label: "Create Comment",
                path: "/comments"
              },
              {
                icon: "📊",
                label: "Generate Report",
                path: "/reports"
              }
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PIDashboard;
