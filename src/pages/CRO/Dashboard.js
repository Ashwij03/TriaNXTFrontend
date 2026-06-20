// UPDATED: CRO dashboard with dynamic site and comment data from adminService

import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import KPICard from "../../Components/dashboard/KPICard";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DashboardBarChart from "../../Components/dashboard/DashboardBarChart";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import VisitCalendarSection from "../../Components/dashboard/VisitCalendarSection";
import { getCRODashboardData } from "../../services/adminService";
import "../Admin/AdminPage.css";
import "../Admin/Dashboard.css";

function CRODashboard() {
  const navigate = useNavigate();

  const { sites, studies, openComments, sitePerformance, alerts } =
    getCRODashboardData();

  const chartData = sitePerformance.map((site) => ({
    name: site.siteName,
    value: Number(site.enrolled || 0)
  }));

  return (
    <DashboardLayout>
      <div className="admin-page">
        <div className="admin-page-title">
          <h1>CRO Dashboard</h1>
          <p>Multi-site monitoring and oversight overview</p>
        </div>

        <div className="admin-kpi-grid">
          <KPICard
            title="Sites"
            value={sites.length}
            subtitle="Monitored Sites"
            icon="🏥"
            onClick={() => navigate("/sites")}
          />
          <KPICard
            title="Studies"
            value={studies.length}
            subtitle="Active Portfolio"
            icon="📁"
            onClick={() => navigate("/studies")}
          />
          <KPICard
            title="Open Comments"
            value={openComments.length}
            subtitle="Require Resolution"
            icon="💬"
            onClick={() => navigate("/comments")}
          />
        </div>

        <DashboardCard title="Enrollment by Site">
          <DashboardBarChart data={chartData} />
        </DashboardCard>

        <VisitCalendarSection />

        <div className="dashboard-grid-2">
          <AlertsPanel title="Monitoring Alerts" alerts={alerts} />

          <QuickActions
            actions={[
              {
                icon: "📈",
                label: "Site Performance",
                path: "/site-performance"
              },
              {
                icon: "📄",
                label: "Regulatory",
                path: "/regulatory"
              },
              {
                icon: "📊",
                label: "Reports",
                path: "/reports"
              },
              {
                icon: "🔔",
                label: "Notifications",
                path: "/notifications"
              }
            ]}
          />
        </div>

        <DataTable
          title="Open Comments"
          columns={[
            { key: "id", label: "Comment ID" },
            { key: "subjectId", label: "Subject" },
            { key: "study", label: "Study" },
            { key: "site", label: "Site" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status" }
          ]}
          data={openComments}
        />
      </div>
    </DashboardLayout>
  );
}

export default CRODashboard;
