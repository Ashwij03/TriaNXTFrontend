// UPDATED: Admin dashboard — Phase 8 subject-status analytics and full-height Upcoming Visits

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";

import KPICard from "../../Components/dashboard/KPICard";
import DashboardCard from "../../Components/dashboard/DashboardCard";
import DashboardPieChart from "../../Components/dashboard/DashboardPieChart";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import QuickActions from "../../Components/dashboard/QuickActions";
import VisitCalendarSection from "../../Components/dashboard/VisitCalendarSection";
import {
  getAdminDashboardData,
  getSubjectsForAnalytics
} from "../../services/adminService";
import { getSubjectStatusAnalytics } from "../../utils/contentAccess";
import {
  INSTITUTION_FILTER_EVENT,
  getStoredInstitutionFilter
} from "../../constants/headerFilters";

import "./Dashboard.css";
import "../shared/AccessPermissions.css";

function AdminDashboard() {
  const [institutionFilter, setInstitutionFilter] = useState(
    getStoredInstitutionFilter()
  );

  useEffect(() => {
    const handleFilterChange = (event) => {
      setInstitutionFilter(event?.detail || getStoredInstitutionFilter());
    };

    window.addEventListener(INSTITUTION_FILTER_EVENT, handleFilterChange);

    return () => {
      window.removeEventListener(
        INSTITUTION_FILTER_EVENT,
        handleFilterChange
      );
    };
  }, []);

  const dashboardData = useMemo(
    () => getAdminDashboardData(institutionFilter),
    [institutionFilter]
  );
  const navigate = useNavigate();

  const {
    users,
    studies,
    sites,
    comments,
    pendingUsers,
    complianceScore
  } = dashboardData;

  const subjectStatusData = useMemo(() => {
    const subjects = getSubjectsForAnalytics().filter(
      (subject) =>
        !institutionFilter ||
        subject.site === institutionFilter ||
        subject.site?.includes(institutionFilter) ||
        institutionFilter.includes(subject.site || "")
    );
    return getSubjectStatusAnalytics(subjects);
  }, [institutionFilter]);

  const openComments = comments.filter((c) => c.status === "Open");

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <div className="dashboard-page-title">
          <h1>Admin Dashboard</h1>
          <p>
            Clinical Trial System Overview
            {institutionFilter ? ` — ${institutionFilter}` : ""}
          </p>
        </div>

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
            value={pendingUsers.length}
            subtitle="Access Requests"
            icon="🛡️"
            onClick={() => navigate("/access-permission")}
          />

          <KPICard
            title="Studies"
            value={studies.length}
            subtitle="Active Studies"
            icon="📁"
            onClick={() => navigate("/studies")}
          />

          <KPICard
            title="Sites"
            value={sites.length}
            subtitle="Operational Sites"
            icon="🏥"
            onClick={() => navigate("/sites")}
          />

          <KPICard
            title="Comments"
            value={openComments.length}
            subtitle="Open Comments"
            icon="💬"
            onClick={() => navigate("/comments")}
          />

          <KPICard
            title="Compliance"
            value={complianceScore}
            subtitle="Overall Score"
            icon="✅"
          />
        </div>

        <VisitCalendarSection institutionFilter={institutionFilter} />

        <DashboardCard title="Subject Status Analytics">
          <div className="subject-status-kpi-grid">
            {subjectStatusData.map((item) => (
              <div key={item.name} className="subject-status-kpi">
                <strong>{item.value}</strong>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <DashboardPieChart data={subjectStatusData} />
        </DashboardCard>

        <div className="dashboard-grid-2">
          <AlertsPanel
            title="System Alerts"
            alerts={[
              {
                type: "warning",
                title: "Pending Approvals",
                message: `${pendingUsers.length} users awaiting approval`
              },
              {
                type: "danger",
                title: "Open Comments",
                message: `${openComments.length} unresolved comments`
              },
              {
                type: "info",
                title: "Study Update",
                message: `${studies.length} studies in portfolio`
              }
            ]}
          />

          <QuickActions
            actions={[
              {
                icon: "👤",
                label: "User Management",
                path: "/user-management"
              },
              {
                icon: "🛡️",
                label: "Access Permission",
                path: "/access-permission"
              },
              {
                icon: "📁",
                label: "Studies",
                path: "/studies"
              },
              {
                icon: "📈",
                label: "Reports",
                path: "/reports"
              }
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
