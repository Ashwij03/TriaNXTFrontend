import { useMemo, useState } from "react";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import KPICard from "../../Components/dashboard/KPICard";
import DataTable from "../../Components/dashboard/DataTable";
import {
  canResolveComments,
  canWriteComments,
  getVisibleComments,
  resolveCommentRecord
} from "../../services/commentService";
import { getAssignedSite } from "../../services/roleService";
import "./AdminPage.css";

function Comments() {
  const assignedSite = getAssignedSite();
  const [refreshKey, setRefreshKey] = useState(0);

  const comments = useMemo(() => {
    void refreshKey;
    return getVisibleComments({}, undefined);
  }, [refreshKey]);

  const openComments = comments.filter((c) => c.status === "Open");
  const resolvedComments = comments.filter((c) => c.status === "Resolved");

  const handleResolve = (commentId) => {
    if (resolveCommentRecord(commentId)) {
      setRefreshKey((value) => value + 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="admin-page">
        <div className="admin-page-title">
          <h1>Comments</h1>
          <p>
            Central comments record for all studies — not a nested file tree
            {assignedSite ? ` — ${assignedSite}` : ""}
          </p>
        </div>

        <div className="admin-kpi-grid">
          <KPICard
            title="Total"
            value={comments.length}
            subtitle="All Comments"
            icon="💬"
          />
          <KPICard
            title="Open"
            value={openComments.length}
            subtitle="Pending Resolution"
            icon="📋"
          />
          <KPICard
            title="Resolved"
            value={resolvedComments.length}
            subtitle="Closed Comments"
            icon="✅"
          />
        </div>

        <div className="admin-table-section">
          <DataTable
            title="Comment Registry"
            columns={[
              { key: "id", label: "ID" },
              { key: "subjectDocument", label: "Subject/Document" },
              { key: "comment", label: "Comment" },
              { key: "by", label: "By" },
              { key: "date", label: "Date" },
              { key: "stage", label: "Stage" },
              { key: "status", label: "Status" },
              ...(canResolveComments() ? [{ key: "action", label: "Action" }] : [])
            ]}
            data={comments.map((item) => ({
              id: item.id,
              subjectDocument: item.documentDeleted
                ? `${item.subjectId} / ${item.document || "Deleted document"}`
                : item.document
                  ? `${item.subjectId} / ${item.document}`
                  : item.subjectId,
              comment: item.description || "—",
              by: item.createdBy || "—",
              date: item.createdAt || "—",
              stage: item.stage || "—",
              status: item.status,
              action:
                item.status === "Open" && canResolveComments() ? (
                  <button type="button" onClick={() => handleResolve(item.id)}>
                    Resolve
                  </button>
                ) : (
                  "—"
                )
            }))}
          />
        </div>

        {!canWriteComments() && (
          <p className="admin-note">
            Your role has view-only access to comments at the current study stage.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Comments;
