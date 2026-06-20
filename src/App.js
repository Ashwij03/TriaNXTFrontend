import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProfilePage from "./pages/shared/profile/ProfilePage";
import SecurityPage from "./pages/shared/profile/SecurityPage";
import ROLES from "./constants/roles";
import Studies from "./pages/shared/studies/Studies";
import StudyDashboard from "./pages/shared/studies/StudyDashboard";
import StudyDetails from "./pages/shared/studies/StudyDetails";
import VisitDetails from "./pages/shared/visits/VisitDetails";
import CompletedVisit from "./pages/shared/visits/CompletedVisit";
import SubjectsDashboard from "./pages/shared/subjects/SubjectsDashboard";
import SubjectProfilePage from "./pages/shared/subjects/SubjectProfilePage";
import SubjectPage from "./pages/shared/subjects/SubjectPage";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
import EISFHub from "./pages/shared/documents/EISFHub";

import ProgressNotes from "./pages/shared/operations/ProgressNotes";
import OperationsComments from "./pages/shared/operations/Comments";
import StudyCommentsPage from "./pages/shared/studies/StudyCommentsPage";
import StudyLogsPage from "./pages/shared/studies/StudyLogsPage";
import FileDetails from "./pages/shared/documents/FileDetails";
//newly added till here
import PIDashboard from "./pages/PI/Dashboard";
import PIComments from "./pages/PI/PIComments";
import PICommentModal from "./pages/PI/PICommentModal";
import PIEISFDashboard from "./pages/PI/PIEISFDashboard";
import PIICFDashboard from "./pages/PI/PIICFDashboard";
import PILiveChat from "./pages/PI/PILiveChat";
import PINotifications from "./pages/PI/PINotifications";
import PIRecruitment from "./pages/PI/PIRecuritment";
import PIRegulatory from "./pages/PI/PIRegulatory";
import PIReports from "./pages/PI/PIReports";
import PISettings from "./pages/PI/PISettings";
import PISitePerformance from "./pages/PI/PISitePerformance";
import PIStudyFolderDashboard from "./pages/PI/PIStudyFolderDashboard";
import PIStudySubjectsProfile from "./pages/PI/PIStudySubjectsProfile";
import PISubjectsDashboard from "./pages/PI/PISubjectsDashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import SiteStaffDashboard from "./pages/SiteStaff/Dashboard";
import CRODashboard from "./pages/CRO/Dashboard";
import SponsorDashboard from "./pages/Sponsor/Dashboard";
import AccessRequestForm from "./pages/shared/AccessRequestForm";
import AccessPermissions from "./pages/shared/AccessPermissions";
import PermissionApproval from "./pages/shared/PermissionApproval";
import UserManagement from "./pages/shared/UserManagement";
import CROOverview from "./pages/CRO/CROOverview";

import Sites from "./pages/Admin/Sites";
import AdminComments from "./pages/Admin/Comments";
import SitePerformance from "./pages/Admin/SitePerformance";
import Recruitment from "./pages/Admin/Recruitment";
import Regulatory from "./pages/Admin/Regulatory";
import Reports from "./pages/Admin/Reports";
import Notifications from "./pages/Admin/Notifications";
import Settings from "./pages/Admin/Settings";
import LogsPage from "./pages/shared/logs/LogsPage";
import TrainingLogPage from "./pages/shared/logs/TrainingLogPage";
import DelegationLogPage from "./pages/shared/logs/DelegationLogPage";
import { getDashboardPath, getCurrentUser } from "./services/roleService";

function RoleAwareFallback() {
  const user = getCurrentUser();
  const destination = user?.role
    ? getDashboardPath(user.role)
    : "/login";

  return <Navigate to={destination} replace />;
}

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
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/completedvisit" element={<CompletedVisit />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/security"
        element={
          <ProtectedRoute>
            <SecurityPage />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/study/:code/logs"
        element={
          <ProtectedRoute>
            <StudyLogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/study/:code/comments"
        element={
          <ProtectedRoute>
            <StudyCommentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/study/:code"
        element={
          <ProtectedRoute>
            <StudyDetails />
          </ProtectedRoute>
        }
      />

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
        element={
          <ProtectedRoute>
            <SubjectsDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subject/:id"
        element={
          <ProtectedRoute>
            <SubjectProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subject-page"
        element={
          <ProtectedRoute>
            <SubjectPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/operations/comments"
        element={
          <ProtectedRoute>
            <OperationsComments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comments"
        element={
          <ProtectedRoute>
            <AdminComments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress-notes"
        element={
          <ProtectedRoute>
            <ProgressNotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/file-details"
        element={
          <ProtectedRoute>
            <FileDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-logs"
        element={
          <ProtectedRoute>
            <StudyLogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logs"
        element={
          <ProtectedRoute>
            <LogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logs/training"
        element={
          <ProtectedRoute>
            <TrainingLogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logs/delegation"
        element={
          <ProtectedRoute>
            <DelegationLogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delegation"
        element={<Navigate to="/logs/delegation" replace />}
      />

      <Route
        path="/training"
        element={<Navigate to="/logs/training" replace />}
      />

      <Route
        path="/ereg-comments"
        element={
          <ProtectedRoute>
            <EISFHub />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}

      {/* //newly added */}

      
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/site-staff-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SITE_STAFF]}>
            <SiteStaffDashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/pi-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PI]}>
            <PIDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cro-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CRO]}>
            <CRODashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sponsor-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SPONSOR]}>
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
        path="/access-permission"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SITE_STAFF]}>
            <AccessPermissions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/permission-approval"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SITE_STAFF]}>
            <PermissionApproval />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cro-overview"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SITE_STAFF, ROLES.CRO]}>
            <CROOverview />
          </ProtectedRoute>
        }
      />

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
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SITE_STAFF]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sites"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.CRO]}>
            <Sites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/queries"
        element={<Navigate to="/comments" replace />}
      />

      <Route
        path="/site-performance"
        element={
          <ProtectedRoute>
            <SitePerformance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruitment"
        element={
          <ProtectedRoute>
            <Recruitment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/regulatory"
        element={
          <ProtectedRoute>
            <Regulatory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<RoleAwareFallback />} />
    </Routes>
  );
}

export default App;
