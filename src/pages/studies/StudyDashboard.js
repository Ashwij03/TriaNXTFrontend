import { useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import KPICard from "../../Components/dashboard/KPICard";
import CalendarWidget from "../../Components/dashboard/CalendarWidget";
import AlertsPanel from "../../Components/dashboard/AlertsPanel";
import DashboardBarChart from "../../Components/dashboard/DashboardBarChart";
import DashboardPieChart from "../../Components/dashboard/DashboardPieChart";
import StudySubjects from "./StudySubjects";
import StudyWorkspaceTabs from "./StudyWorkspaceTabs";
import StudyVisits from "../visits/StudyVisits";
import StudyDocuments from "./StudyDocuments";
import StudyQueries from "./StudyQueries";
import StudyRegulatory from "./StudyRegulatory";
import StudyReports from "./StudyReports";
import SubjectProfile from "../../pages/subjects/SubjectProfile";
import useStudiesDashboard from "../../hooks/useStudiesDashboard";
import { getStudyByCode, deleteStudy } from "../../services/studyService";
import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal";
import RecentSubjectsWidget from "../../Components/dashboard/RecentSubjectsWidget";
import UpcomingVisitsWidget from "../../Components/dashboard/UpcomingVisitsWidget";
import PendingQueriesWidget from "../../Components/dashboard/PendingQueriesWidget";
import QuickActionsWidget from "../../Components/dashboard/QuickActionsWidget";
import RecentActivity from "../../Components/dashboard/RecentActivity";

import {
  FiFolder,
  FiUsers,
  FiClipboard,
  FiAlertCircle,
  FiTrash2
} from "react-icons/fi";

import "./Studies.css";
import "./StudyDashboard.css";


function StudyDashboard() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] =
    useState(
      searchParams.get("tab")
        || "Overview"
    );

  const [selectedScheduleDate, setSelectedScheduleDate] =
    useState("2026-06-10");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Codex change: dashboard data is loaded through the hook/service layer, not hardcoded in JSX.
  const { data } = useStudiesDashboard();
  if (!data) {
    return (
      <DashboardLayout>
        <div className="dashboard-loading">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const isAdmin =
    currentUser?.role ===
    "Admin";

  const currentStudy =
    getStudyByCode(id);

  const studyActivities = [

    {
      id: 1,
      title: "Subject SUB-001 enrolled",
      time: "09:10 AM",
    },

    {
      id: 2,
      title: "Visit 3 completed",
      time: "08:45 AM",
    },

    {
      id: 3,
      title: "Query Q-101 resolved",
      time: "08:00 AM",
    },

  ];
  

  const handleDeleteStudy = (deletionDetails) => {
    if (currentStudy) {
      try {
        deleteStudy(currentStudy.code, deletionDetails);
        setShowDeleteModal(false);
        alert(`Study "${currentStudy.name}" has been deleted successfully.`);
        navigate("/studies");
      } catch (error) {
        alert("Error deleting study: " + error.message);
      }
    }
  };

  return (

    <DashboardLayout>

      {/* Codex change: DashboardLayout keeps sidebar and header visible on study dashboard routes. */}
      <div className="study-dashboard-page">

        <div className="page-header">

          <div>
        
            <h1>
              {
                currentStudy?.name ||
                "Study Dashboard"
              }
            </h1>
        
            <p>
              {
                isAdmin
                  ? "All Sites Overview"
                  : "Assigned Site Overview"
              }
            </p>
          
          </div>
          
          <div className="page-header-actions">
            <button
              className="open-study-btn"
              onClick={() =>
                navigate(
                  `/study/${id}`
                )
              }
            >
          
              Open Study Workspace
          
            </button>

            <button
              className="delete-study-btn"
              onClick={() => setShowDeleteModal(true)}
              title="Delete study"
              aria-label="Delete study"
            >
              <FiTrash2 /> Delete Study
            </button>
          </div>

        </div>

        {/* KPI SECTION */}

        <div className="studies-kpi-grid">

          <KPICard
            title="Total Studies"
            value={data.kpis.studies}
            subtitle="Across All Sites"
            icon={<FiFolder />}
          />

          <KPICard
            title="Total Subjects"
            value={data.kpis.subjects}
            subtitle="Across Studies"
            icon={<FiUsers />}
          />

          <KPICard
            title="Open Queries"
            value={data.kpis.queries}
            subtitle="Need Attention"
            icon={<FiAlertCircle />}
          />

          <KPICard
            title="Site Visits"
            value={data.kpis.visits}
            subtitle="Scheduled"
            icon={<FiClipboard />}
          />

        </div>

        <StudyWorkspaceTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "Overview" && (
        
          <>
            <RecentActivity
              activities={studyActivities}
            />

            {/* CHARTS */}
            <div className="studies-chart-grid">
        
              <div className="chart-card">
                <h3>Enrollment Progress</h3>
        
                <DashboardBarChart
                  data={data.enrollmentTrend}
                />
              </div>
        
              <div className="chart-card">
                <h3>Study Distribution</h3>
        
                <DashboardPieChart
                  data={data.studyDistribution}
                />
              </div>
        
            </div>
        
            {/* WIDGETS */}
            <div className="widget-grid">
        
              <RecentSubjectsWidget
                subjects={data.recentSubjects}
              />

              <UpcomingVisitsWidget
                visits={data.upcomingVisits}
              />

            </div>
        
            <div className="widget-grid">
        
              <PendingQueriesWidget
                queries={data.pendingQueries}
              />

              <QuickActionsWidget />
        
            </div>

            <div className="calendar-alerts-grid">

              <div className="calendar-wrapper">
                    
                <CalendarWidget
                  schedules={data.calendarSchedules}
                  selectedDate={selectedScheduleDate}
                  onDateSelect={setSelectedScheduleDate}
                />
            
              </div>
                    
              <div className="studies-alert-section">
                    
                <AlertsPanel
                  alerts={data.alerts}
                />
            
              </div>
                    
            </div>
        
          </>

        )}

        {
          activeTab === "Subjects" && (
            <StudySubjects
              setActiveTab={setActiveTab}
            />
          )
        }

        {
          activeTab === "SubjectProfile" && (
            <SubjectProfile
              setActiveTab={setActiveTab}
            />
          )
        }

        {activeTab === "Visits" && (
          <StudyVisits
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "Documents" && (
          <StudyDocuments />
        )}

        {activeTab === "Queries" && (
          <StudyQueries />
        )}

        {activeTab === "Regulatory" && (
          <StudyRegulatory />
        )}

        {activeTab === "Reports" && (
          <StudyReports />
        )}

        {/* RECENT ACTIVITY */}

        {/* <div className="activity-grid single">

          <div className="activity-card">

            <h3>
              Recent Activity
            </h3>

            <ul>
              {getRecentActivityLogs(10).length > 0 ? (
                getRecentActivityLogs(10).map((log) => (
                  <li key={log.id}>
                    <div className="activity-item">
                      <strong>{log.action}</strong>
                      <div className="activity-details">
                        {log.action === "STUDY_DELETED" && (
                          <span>Study: {log.studyName} - Deleted by {log.deletedBy}</span>
                        )}
                        {log.action === "SUBJECT_DELETED" && (
                          <span>Subject: {log.subjectId} - Deleted by {log.deletedBy}</span>
                        )}
                      </div>
                      <span className="activity-time">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    Subject SUB-001 enrolled
                    <span>2 mins ago</span>
                  </li>

                  <li>
                    Visit 3 completed
                    <span>5 mins ago</span>
                  </li>

                  <li>
                    New query raised
                    <span>10 mins ago</span>
                  </li>

                  <li>
                    Regulatory file uploaded
                    <span>30 mins ago</span>
                  </li>
                </>
              )}
            </ul>

          </div>

        </div> */}


      </div>

      {showDeleteModal && currentStudy && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteStudy}
          title={`Delete Study: ${currentStudy.name}`}
          message={`Are you sure you want to delete the study "${currentStudy.name}" (${currentStudy.code})? This action cannot be undone.`}
          itemType="study"
        />
      )}

    </DashboardLayout>

  );
}

export default StudyDashboard;
