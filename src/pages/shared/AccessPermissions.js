import { useState } from "react";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import DataTable from "../../Components/dashboard/DataTable";
import {
  acceptAccessRequest,
  getAccessRequestHistory,
  getPendingAccessRequests,
  revokeAccessRequest
} from "../../services/accessPermissionService";
import "./AccessPermissions.css";

function StatusPill({ status }) {
  const normalized = String(status || "").toLowerCase();
  let className = "status-pill";

  if (normalized === "active" || normalized === "accepted" || normalized === "approved") {
    className += " active";
  } else if (normalized === "pending") {
    className += " pending";
  } else if (normalized === "revoked") {
    className += " revoked";
  } else {
    className += " inactive";
  }

  return <span className={className}>{status}</span>;
}

function AccessPermissions() {
  const [activeTab, setActiveTab] = useState("pending");
  const [refreshKey, setRefreshKey] = useState(0);

  void refreshKey;

  const pendingRequests = getPendingAccessRequests();
  const requestHistory = getAccessRequestHistory();

  const handleAccept = (requestId) => {
    acceptAccessRequest(requestId);
    setRefreshKey((value) => value + 1);
  };

  const handleRevoke = (requestId) => {
    revokeAccessRequest(requestId);
    setRefreshKey((value) => value + 1);
  };

  const pendingColumns = [
    { key: "id", label: "Request ID" },
    { key: "user", label: "User" },
    { key: "studySubject", label: "Study / Subject" },
    { key: "accessType", label: "Access Type" },
    { key: "requestedOn", label: "Requested On" },
    { key: "actions", label: "Actions" }
  ];

  const historyColumns = [
    { key: "id", label: "Request ID" },
    { key: "user", label: "User" },
    { key: "studySubject", label: "Study / Subject" },
    { key: "accessType", label: "Access Type" },
    { key: "requestedOn", label: "Requested On" },
    { key: "status", label: "Status" },
    { key: "resolvedOn", label: "Resolved On" }
  ];

  const pendingData = pendingRequests.map((request) => ({
    id: request.id,
    user: request.userName || request.user,
    studySubject: request.studySubject,
    accessType: request.accessType,
    requestedOn: request.requestedOn,
    actions: (
      <div className="access-actions-cell">
        <button
          type="button"
          className="access-action-link"
          onClick={() => handleAccept(request.id)}
        >
          Accept
        </button>
        <button
          type="button"
          className="access-action-link revoke"
          onClick={() => handleRevoke(request.id)}
        >
          Revoke
        </button>
      </div>
    )
  }));

  const historyData = requestHistory.map((request) => ({
    id: request.id,
    user: request.userName || request.user,
    studySubject: request.studySubject,
    accessType: request.accessType,
    requestedOn: request.requestedOn,
    status: <StatusPill status={request.status} />,
    resolvedOn: request.resolvedOn || "—"
  }));

  return (
    <DashboardLayout>
      <div className="access-permissions-page">
        <div className="access-permissions-header">
          <h1>Access Permission</h1>
          <p>Review and manage access permission requests</p>
        </div>

        <div className="access-permissions-tabs">
          <button
            type="button"
            className={`access-tab${activeTab === "pending" ? " active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests
            <span className="access-tab-badge">{pendingRequests.length}</span>
          </button>
          <button
            type="button"
            className={`access-tab${activeTab === "history" ? " active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Request History
            <span className="access-tab-badge">{requestHistory.length}</span>
          </button>
        </div>

        {activeTab === "pending" ? (
          <DataTable
            title="Pending Requests"
            columns={pendingColumns}
            data={pendingData}
            emptyMessage="No pending access requests"
          />
        ) : (
          <DataTable
            title="Request History"
            columns={historyColumns}
            data={historyData}
            emptyMessage="No request history yet"
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default AccessPermissions;
