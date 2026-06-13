import "./DashboardSidebar.css";
import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  FiBarChart2,
  FiBell,
  FiClipboard,
  FiFileText,
  FiFolder,
  FiGrid,
  FiSettings,
  FiTrendingUp,
  FiUsers
} from "react-icons/fi";

function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const resizingRef = useRef(false);

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const [Study_BinderOpen, setStudy_BinderOpen] =
    useState(true);
  const [studiesOpen, setStudiesOpen] =
    useState(false);
  const [eisfOpen, setEisfOpen] =
    useState(false);
  const [icfOpen, setIcfOpen] =
    useState(false);
  const [studyFolderOpen, setStudyFolderOpen] =
    useState(false);
  
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const [subjectsOpen, setSubjectsOpen] = useState(false);

  // Codex change: user can resize the enterprise sidebar; width is persisted for future sessions.
  const [sidebarWidth, setSidebarWidth] =
    useState(() => {
      const storedWidth =
        Number(
          localStorage.getItem(
            "dashboardSidebarWidth"
          )
        );

      return storedWidth || 260;
    });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!resizingRef.current) {
        return;
      }

      const nextWidth =
        Math.min(
          390,
          Math.max(
            220,
            event.clientX
          )
        );

      setSidebarWidth(nextWidth);
      localStorage.setItem(
        "dashboardSidebarWidth",
        String(nextWidth)
      );
    };

    const handleMouseUp = () => {
      resizingRef.current = false;
      document.body.classList.remove(
        "sidebar-resizing"
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );
    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, []);

  // Codex change: keep dashboard navigation role-aware from one place.
  const dashboardPath =
    currentUser?.role === "Admin"
      ? "/admin-dashboard"
      : currentUser?.role === "SiteStaff"
        ? "/site-staff-dashboard"
        : currentUser?.role === "PI"
          ? "/pi-dashboard"
          : currentUser?.role === "CRO"
            ? "/cro-dashboard"
            : currentUser?.role === "Sponsor"
              ? "/sponsor-dashboard"
              : "/dashboard";

  // Codex change: active sidebar state now follows the current route.
  const isDashboardActive =
    pathname === "/dashboard" ||
    (
      pathname.endsWith("-dashboard") &&
      !pathname.startsWith("/study-dashboard")
    );

  const isStudiesActive =
    pathname === "/studies" ||
    pathname.startsWith("/study-dashboard") ||
    pathname.startsWith("/study/");

  // Codex change: shared helper prevents hardcoded "active" classes.
  const getLinkClass = (isActive) =>
    isActive
      ? "sidebar-link active"
      : "sidebar-link";
  
  console.log(
    "Studies =>",
    JSON.parse(
      localStorage.getItem("studies")
    )
  );
  
  const studies =
    JSON.parse(
      localStorage.getItem(
        "studyFolders"
      )
    ) || [];
  
  const studyCount =
    studies.length;
  
  const subjects =
    JSON.parse(
      localStorage.getItem(
        "subjects"
      )
    ) || [];
  
  const subjectCount =
    subjects.length;

  return (
    <div
      className="enterprise-sidebar"
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        flexBasis: sidebarWidth
      }}
    >
      <div
        className="sidebar-logo"
        onClick={() => navigate(dashboardPath)}
      >
        TriaNXT
      </div>

      <div
        className={getLinkClass(isDashboardActive)}
        onClick={() => {
        
          setStudiesOpen(false);
        
          setSubjectsOpen(false);
        
          setStudy_BinderOpen(false);
        
          setEisfOpen(false);
        
          setIcfOpen(false);
        
          setStudyFolderOpen(false);
        
          navigate(dashboardPath);
        
        }}
      >
        <FiGrid size={18} />
        <span>Dashboard</span>
      </div>

      <div
        className={getLinkClass(isStudiesActive)}
        onClick={() => {
          navigate("/studies");
          setStudiesOpen(!studiesOpen);
        }}
      >
        <FiFolder size={18} />
        <span>
          Studies ({studyCount})
        </span>
      </div>

      {studiesOpen && (
        <div className="sidebar-submenu">
          <div
            className="submenu-parent"
            onClick={() => setStudy_BinderOpen(!Study_BinderOpen)}
          >
            Study Binder
          </div>

          {Study_BinderOpen && (
            <div className="nested-submenu">
              {/* <div
                className="submenu-item"
                onClick={() => navigate("/studies")}
              >
                Study Overview
              </div> */}

              <div
                className="submenu-item"
                onClick={() =>
                  setSubjectsOpen(!subjectsOpen)
                }
              >
                Subjects ({subjectCount})
              </div>
              
              {subjectsOpen && (
              
                <>
                  {subjects.map(subject => (
                  
                    <div
                      key={subject.id}
                      className="subject-node"
                    >
                    
                      <div
                        className="submenu-item subject-folder"
                        onClick={() =>
                          setExpandedSubjects(prev => ({
                            ...prev,
                            [subject.id]:
                              !prev[subject.id]
                          }))
                        }
                      >
                        {subject.subjectId ||
                          subject.id}
                      </div>
                        
                      {expandedSubjects[
                        subject.id
                      ] && (
                      
                        <div className="nested-submenu">
                        
                          <div className="submenu-item subject-child">
                            Screening
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Enrollment
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Visits
                          </div>
                      
                          <div className="submenu-item subject-child">
                            End Of Treatment
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Progress Notes
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Comments
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Files
                          </div>
                      
                          <div className="submenu-item subject-child">
                            Logs
                          </div>
                      
                        </div>

                      )}

                    </div>

                  ))}
                </>

              )}
            </div>
          )}

          <div
            className="submenu-parent"
            onClick={() => setEisfOpen(!eisfOpen)}
          >
            eISF
          </div>

          {eisfOpen && (
            <div className="nested-submenu">
              <div className="submenu-item">
                Essential Documents
              </div>
              <div className="submenu-item">
                Monitoring Reports
              </div>
              <div className="submenu-item">
                Site Files
              </div>
            </div>
          )}

          <div
            className="submenu-parent"
            onClick={() => setIcfOpen(!icfOpen)}
          >
            ICF
          </div>

          {icfOpen && (
            <div className="nested-submenu">
              <div className="submenu-item">
                Approved Versions
              </div>
              <div className="submenu-item">
                Archived Versions
              </div>
            </div>
          )}

          <div
            className="submenu-parent"
            onClick={() => setStudyFolderOpen(!studyFolderOpen)}
          >
            Study Folder
          </div>

          {studyFolderOpen && (
            <div className="nested-submenu">
              <div className="submenu-item">
                Protocol
              </div>
              <div className="submenu-item">
                Regulatory
              </div>
              <div className="submenu-item">
                Monitoring
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className={getLinkClass(pathname.includes("site-performance"))}
        onClick={() => navigate("/site-performance")}
      >
        <FiTrendingUp size={18} />
        <span>Site Performance</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("recruitment"))}
        onClick={() => navigate("/recruitment")}
      >
        <FiUsers size={18} />
        <span>Recruitment</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("regulatory"))}
        onClick={() => navigate("/regulatory")}
      >
        <FiFileText size={18} />
        <span>Regulatory</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("reports"))}
        onClick={() => navigate("/reports")}
      >
        <FiBarChart2 size={18} />
        <span>Reports</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("user-management"))}
        onClick={() => navigate("/user-management")}
      >
        <FiUsers size={18} />
        <span>User Management</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("permission-approval"))}
        onClick={() => navigate("/permission-approval")}
      >
        <FiClipboard size={18} />
        <span>Permission Approval</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("notifications"))}
        onClick={() => navigate("/notifications")}
      >
        <FiBell size={18} />
        <span>Notifications</span>
      </div>

      <div
        className={getLinkClass(pathname.includes("settings"))}
        onClick={() => navigate("/settings")}
      >
        <FiSettings size={18} />
        <span>Settings</span>
      </div>

      {/* Codex change: drag this handle to resize the fixed dashboard sidebar. */}
      <div
        className="sidebar-resize-handle"
        onMouseDown={(event) => {
          event.preventDefault();
          resizingRef.current = true;
          document.body.classList.add(
            "sidebar-resizing"
          );
        }}
      />
    </div>
  );
}

export default DashboardSidebar;
