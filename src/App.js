import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Existing Components */
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Studies from "./pages/studies/Studies";
import StudyDashboard from "./pages/studies/StudyDashboard";
import StudyDetails from "./pages/studies/StudyDetails";
import VisitDetails from "./pages/visits/VisitDetails";
import CompletedVisit from "./pages/visits/CompletedVisit";
import SubjectsDashboard from "./pages/subjects/SubjectsDashboard";
import SubjectProfile from "./pages/subjects/SubjectProfile";
import SubjectPage from "./pages/subjects/SubjectPage";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
// import DashboardLayout from "./Components/dashboard/DashboardLayout";
/* Friend Components */
import ERegComments from "./Components/ERegComments";
import TrainingLog from "./Components/TrainingLog";
import DelegationLog from "./Components/DelegationLog";

import ProgressNotes from "./pages/operations/ProgressNotes";
import Comments from "./pages/operations/Comments";
import StudyLogs from "./pages/operations/StudyLogs";
import FileDetails from "./pages/documents/FileDetails";

// newly added
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import SiteStaffDashboard from "./pages/dashboards/SiteStaffDashboard";

import CRODashboard from "./pages/dashboards/CRODashboard";
import SponsorDashboard from "./pages/dashboards/SponsorDashboard";
import AccessRequestForm from "./pages/AccessRequestForm";
import PermissionApproval from "./pages/PermissionApproval";
import UserManagement from "./pages/UserManagement"; //newly added till here
import PIDashboard from "./pages/dashboards/pi/PIDashboard";
import PIComments from "./pages/dashboards/pi/PIComments";
import PICommentModal from "./pages/dashboards/pi/PICommentModal";
import PIEISFDashboard from "./pages/dashboards/pi/PIEISFDashboard";
import PIICFDashboard from "./pages/dashboards/pi/PIICFDashboard";
import PILiveChat from "./pages/dashboards/pi/PILiveChat";
import PINotifications from "./pages/dashboards/pi/PINotifications";
import PIRecruitment from "./pages/dashboards/pi/PIRecuritment";
import PIRegulatory from "./pages/dashboards/pi/PIRegulatory";
import PIReports from "./pages/dashboards/pi/PIReports";
import PISettings from "./pages/dashboards/pi/PISettings";
import PISitePerformance from "./pages/dashboards/pi/PISitePerformance";
import PIStudyFolderDashboard from "./pages/dashboards/pi/PIStudyFolderDashboard";
import PIStudySubjectsProfile from "./pages/dashboards/pi/PIStudySubjectsProfile";
import PISubjectsDashboard from "./pages/dashboards/pi/PISubjectsDashboard";

function App() {
  return (
    
    <Routes>
      <Route
  path="/pi-livechat"
  element={<PILiveChat />}
/>
<Route path="/pi-comments" element={<PIComments />} />

      <Route path="/pi-site-performance" element={<PISitePerformance />} />
<Route path="/pi-recruitment" element={<PIRecruitment />} />
<Route path="/pi-regulatory" element={<PIRegulatory />} />
<Route path="/pi-reports" element={<PIReports />} />
<Route path="/pi-notifications" element={<PINotifications />} />
<Route path="/pi-settings" element={<PISettings />} />
<Route path="*" element={<Navigate to="/dashboard" />} />
<Route
  path="/pi-subjects-dashboard"
  element={<PISubjectsDashboard />}
/>

<Route
  path="/pi-study-folder-dashboard"
  element={<PIStudyFolderDashboard />}
/>

<Route
  path="/pi-study-subject-profile"
  element={<PIStudySubjectsProfile />}
/>

<Route
  path="/pi-eisf-dashboard"
  element={<PIEISFDashboard />}
/>

<Route
  path="/pi-icf-dashboard"
  element={<PIICFDashboard />}
/>

      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />
     <Route
  path="/pi-dashboard"
  element={
    <ProtectedRoute>
      <PIDashboard />
    </ProtectedRoute>
  }
/>

      {/* Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/completedvisit"
        element={<CompletedVisit />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />


      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Study */}
      {/* Codex change: study list and dashboard use the same ProtectedRoute flow as workspace pages. */}
      <Route
        path="/studies"
        element={
          <ProtectedRoute>
            <Studies />
          </ProtectedRoute>
        }
      />
            
      <Route
        path="/study-dashboard/:id"
        element={
          <ProtectedRoute>
            <StudyDashboard />
          </ProtectedRoute>
        }
      />

      {/* Codex change: keep only /study/:code so StudyDetails receives params.code correctly. */}
      <Route
        path="/study/:code"
        element={
          <ProtectedRoute>
            <StudyDetails />
          </ProtectedRoute>
        }
      />

      {/* Visit */}
      <Route
        path="/visit/:visitId"
        element={
          <ProtectedRoute>
            <VisitDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects"
        element={<SubjectsDashboard />}
      />

      {/* Subject */}
      <Route
        path="/subject/:id"
        element={<SubjectProfile />}
      />

      {/* Extra Subject Page */}
      <Route
        path="/subject-page"
        element={
          <ProtectedRoute>
            <SubjectPage />
          </ProtectedRoute>
        }
      />

      {/* Comments */}
      <Route
        path="/comments"
        element={
          <ProtectedRoute>
            <Comments />
          </ProtectedRoute>
        }
      />

      {/* Progress Notes */}
      <Route
        path="/progress-notes"
        element={
          <ProtectedRoute>
            <ProgressNotes />
          </ProtectedRoute>
        }
      />

      {/* File Details */}
      <Route
        path="/file-details"
        element={
          <ProtectedRoute>
            <FileDetails />
          </ProtectedRoute>
        }
      />

      {/* Study Logs */}
      <Route
        path="/study-logs"
        element={
          <ProtectedRoute>
            <StudyLogs />
          </ProtectedRoute>
        }
      />

      {/* Delegation */}
      <Route
        path="/delegation"
        element={
          <ProtectedRoute>
            <DelegationLog />
          </ProtectedRoute>
        }
      />

      {/* Training */}
      <Route
        path="/training"
        element={
          <ProtectedRoute>
            <TrainingLog />
          </ProtectedRoute>
        }
      />

      {/* EReg Comments */}
      <Route
        path="/ereg-comments"
        element={
          <ProtectedRoute>
            <ERegComments />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}

      {/* //newly added */}

      <Route
      path="/admin-dashboard"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
      />

      <Route
        path="/site-staff-dashboard"
        element={
          <ProtectedRoute>
            <SiteStaffDashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/cro-dashboard"
        element={
          <ProtectedRoute>
            <CRODashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sponsor-dashboard"
        element={
          <ProtectedRoute>
            <SponsorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/access-request"
        element={
          <ProtectedRoute>
            <AccessRequestForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/permission-approval"
        element={
          <ProtectedRoute>
            <PermissionApproval />
          </ProtectedRoute>
        }
      /> 
        {/* newly added till here */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

