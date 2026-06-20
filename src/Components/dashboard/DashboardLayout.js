import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ROLES from "../../constants/roles";
import {
  getCurrentUser,
  isAdmin,
  setAdminPreviewRole
} from "../../services/roleService";

import "./DashboardLayout.css";
import "./dashboard.css";

const DASHBOARD_ROUTE_ROLES = {
  "/admin-dashboard": ROLES.ADMIN,
  "/site-staff-dashboard": ROLES.SITE_STAFF,
  "/pi-dashboard": ROLES.PI,
  "/cro-dashboard": ROLES.CRO,
  "/sponsor-dashboard": ROLES.SPONSOR
};

function useViewportMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") {
      return "desktop";
    }

    const width = window.innerWidth;

    if (width <= 767) {
      return "mobile";
    }

    if (width <= 1024) {
      return "tablet";
    }

    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setMode("mobile");
      } else if (width <= 1024) {
        setMode("tablet");
      } else {
        setMode("desktop");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return mode;
}

function DashboardLayout({ children }) {
  const location = useLocation();
  const contentRef = useRef(null);
  const lastScrollTop = useRef(0);
  const viewportMode = useViewportMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!isAdmin(currentUser)) {
      return;
    }

    const matchedRole = DASHBOARD_ROUTE_ROLES[location.pathname];

    if (matchedRole) {
      setAdminPreviewRole(matchedRole);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (viewportMode === "desktop") {
      setSidebarOpen(false);
    } else {
      setSidebarCollapsed(false);
      setSidebarOpen(false);
    }
  }, [location.pathname, viewportMode]);

  const handleToggleSidebar = useCallback(() => {
    if (viewportMode === "desktop") {
      setSidebarCollapsed((prev) => !prev);
      return;
    }

    setSidebarOpen((prev) => !prev);
  }, [viewportMode]);

  const handleContentScroll = useCallback(() => {
    const node = contentRef.current;

    if (!node) {
      return;
    }

    const currentTop = node.scrollTop;
    const delta = currentTop - lastScrollTop.current;

    if (currentTop <= 8) {
      setHeaderHidden(false);
    } else if (delta > 6) {
      setHeaderHidden(true);
    } else if (delta < -6) {
      setHeaderHidden(false);
    }

    lastScrollTop.current = currentTop;
  }, []);

  useEffect(() => {
    const node = contentRef.current;

    if (!node) {
      return undefined;
    }

    node.addEventListener("scroll", handleContentScroll, { passive: true });

    return () => {
      node.removeEventListener("scroll", handleContentScroll);
    };
  }, [handleContentScroll]);

  const sidebarWrapClass = [
    "dashboard-sidebar-wrap",
    viewportMode !== "desktop" && sidebarOpen ? "is-open" : "",
    viewportMode === "desktop" && sidebarCollapsed ? "is-collapsed" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarIsOpen =
    viewportMode === "desktop" ? !sidebarCollapsed : sidebarOpen;

  return (
    <div className="dashboard-shell">
      {viewportMode !== "desktop" && (
        <div
          className={`sidebar-backdrop${sidebarOpen ? " is-visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={sidebarWrapClass}>
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="dashboard-main">
        <div className="dashboard-main-scaled">
          <div
            className={`dashboard-header-wrap${
              headerHidden ? " header-hidden" : ""
            }`}
          >
            <DashboardHeader
              onToggleSidebar={handleToggleSidebar}
              sidebarOpen={sidebarIsOpen}
            />
          </div>

          <div className="dashboard-content" ref={contentRef}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
