// UPDATED: Sponsor dashboard with dynamic portfolio data from adminService

import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import KPICard from "../../Components/dashboard/KPICard";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DashboardBarChart from "../../Components/dashboard/DashboardBarChart";
import DataTable from "../../Components/dashboard/DataTable";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import VisitCalendarSection from "../../Components/dashboard/VisitCalendarSection";
import {
  getSponsorDashboardData
} from "../../services/adminService";
import "../Admin/AdminPage.css";
import "../Admin/Dashboard.css";

function SponsorDashboard() {
  const navigate = useNavigate();

  const {
    studies,
    reports,
    portfolioValue,
    activeSites,
    complianceScore,
    enrollmentTotal,
    alerts
  } = getSponsorDashboardData();

  const chartData = studies.map((study) => ({
    name: study.code || study.name,
    value: Number(study.enrolled || 0)
  }));

  return (
    <DashboardLayout>
      <div className="admin-page">
        <div className="admin-page-title">
          <h1>Sponsor Dashboard</h1>
          <p>Portfolio performance and compliance overview</p>
        </div>

        <div className="admin-kpi-grid">
          <KPICard
            title="Studies"
            value={portfolioValue}
            subtitle="Portfolio Size"
            icon="📁"
            onClick={() => navigate("/studies")}
          />
          <KPICard
            title="Active Sites"
            value={activeSites}
            subtitle="Operational Network"
            icon="🏥"
            onClick={() => navigate("/sites")}
          />
          <KPICard
            title="Enrollment"
            value={enrollmentTotal}
            subtitle="Total Subjects"
            icon="👥"
          />
          <KPICard
            title="Compliance"
            value={complianceScore}
            subtitle="Overall Score"
            icon="✅"
          />
        </div>

        <DashboardCard title="Enrollment by Study">
          <DashboardBarChart data={chartData} />
        </DashboardCard>

        <VisitCalendarSection />

        <div className="dashboard-grid-2">
          <AlertsPanel title="Portfolio Alerts" alerts={alerts} />

          <QuickActions
            actions={[
              {
                icon: "📈",
                label: "Reports",
                path: "/reports"
              },
              {
                icon: "📄",
                label: "Regulatory",
                path: "/regulatory"
              },
              {
                icon: "📊",
                label: "Site Performance",
                path: "/site-performance"
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
          title="Available Reports"
          columns={[
            { key: "id", label: "Report ID" },
            { key: "name", label: "Name" },
            { key: "category", label: "Category" },
            { key: "lastGenerated", label: "Last Generated" },
            { key: "status", label: "Status" }
          ]}
          data={reports}
        />
      </div>
    </DashboardLayout>
  );
}

export default SponsorDashboard;
