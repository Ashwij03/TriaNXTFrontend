import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./PINavbar.css";
import { FaHome } from "react-icons/fa";
import { FiMessageSquare, FiBell, FiMenu } from "react-icons/fi";
import PIEnterpriseDropdown from "./PIEnterpriseDropdown";
import {
  getNavbarData,
  saveNavbarData,
  searchDashboard,
  getDashboardData,
  clearAuthSession,
  getNavbarNotifications,
  getUnreadNotificationCount,
  toggleNavbarNotificationRead,
  markAllNavbarNotificationsRead,
  collectAllStudies,
} from "./piDashboardService";


const PI_ROLE_OPTIONS = [
  { value: "Principal Investigator", label: "Principal Investigator", subtitle: "Current PI — Full access" },
  { value: "Site Staff", label: "Site Staff", subtitle: "Delegated site operations" },
];
const INDICATION_OPTIONS = [
  {
    value: "Indications",
    label: "Indications",
    subtitle: "All Indications",
  },
  {
    value: "Cardiology",
    label: "Cardiology",
    subtitle: "Active Indication",
  },
  {
    value: "Gynecology",
    label: "Gynecology",
    subtitle: "Active Indication",
  },
  {
    value: "Neurology",
    label: "Neurology",
    subtitle: "Active Indication",
  },
  {
    value: "Psychology",
    label: "Psychology",
    subtitle: "Active Indication",
  },
  {
    value: "Oncology",
    label: "Oncology",
    subtitle: "Active Indication",
  },
];
const SUBJECT_OPTIONS = [
  {
    value: "Subjects",
    label: "Subjects",
    subtitle: "All Subjects",
  },
  {
    value: "SUB-001",
    label: "SUB-001",
    subtitle: "Subject ID",
  },
  {
    value: "SUB-002",
    label: "SUB-002",
    subtitle: "Subject ID",
  },
  {
    value: "SUB-003",
    label: "SUB-003",
    subtitle: "Subject ID",
  },
  {
    value: "SUB-004",
    label: "SUB-004",
    subtitle: "Subject ID",
  },
];
function PINavbar({
  setSelectedPage,
  onToggleSidebar,
  onSearchSelect,
  onProfileNavigate,
}) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndication, setSelectedIndication] =
  useState("Indications");
  const [selectedSubject, setSelectedSubject] =
  useState("Subjects");
  const [navbarData, setNavbarData] = useState(getNavbarData);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [notifications, setNotifications] = useState(getNavbarNotifications);
  const [unreadCount, setUnreadCount] = useState(getUnreadNotificationCount);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  const dashboardData = getDashboardData();

  const refreshNotifications = () => {
    setNotifications(getNavbarNotifications());
    setUnreadCount(getUnreadNotificationCount());
  };

  const refreshNavbar = () => {
  const fresh = getNavbarData();
  setNavbarData(fresh);

  setDepartmentOptions(
    (fresh.departments || []).map((dept) => ({
      value: dept,
      label: dept,
      subtitle: "Department",
    }))
  );
};

  useEffect(() => {
    refreshNavbar();
    refreshNotifications();
    window.addEventListener("pi-settings-updated", refreshNavbar);
    window.addEventListener("pi-notifications-updated", refreshNotifications);
    window.addEventListener("pi-study-data-updated", refreshNavbar);
    return () => {
      window.removeEventListener("pi-settings-updated", refreshNavbar);
      window.removeEventListener("pi-notifications-updated", refreshNotifications);
      window.removeEventListener("pi-study-data-updated", refreshNavbar);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchResults(searchDashboard(value, dashboardData));
  };

  const handleSearchResultClick = (result) => {
    setSearchQuery("");
    setSearchResults([]);
    if (onSearchSelect) onSearchSelect(result);
    if (setSelectedPage) setSelectedPage(result.page);
  };

  const handleStudyChange = (study) => {
    const updated = { ...navbarData, selectedStudy: study };
    setNavbarData(updated);
    saveNavbarData(updated);
    window.dispatchEvent(
      new CustomEvent("pi-study-change", { detail: updated.selectedStudy })
    );
  };

  const handleRoleChange = (role) => {
    const updated = { ...navbarData, selectedRole: role, role };
    setNavbarData(updated);
    saveNavbarData(updated);
    window.dispatchEvent(
      new CustomEvent("pi-role-change", { detail: role })
    );
  };
  const handleDepartmentChange = (department) => {
  const updated = {
    ...navbarData,
    selectedDepartment: department,
  };

  setNavbarData(updated);
  saveNavbarData(updated);
};

  const studyOptions = collectAllStudies().map((study) => ({
    value: study,
    label: study,
    subtitle: study === "All Studies" ? "Portfolio view" : "Active study",
  }));

  const handleLogout = () => {
    setProfileOpen(false);
    clearAuthSession();
    navigate("/login");
  };

  const goToSettings = (view = "security") => {
    setProfileOpen(false);
    if (onProfileNavigate) onProfileNavigate(view);
    if (setSelectedPage) setSelectedPage("settings");
  };

  const goHome = () => {
    if (setSelectedPage) setSelectedPage("dashboard");
    navigate("/pi-dashboard");
  };

  const handleNotificationClick = (index) => {
    toggleNavbarNotificationRead(index);
    refreshNotifications();
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    markAllNavbarNotificationsRead();
    refreshNotifications();
  };

  return (
    <div className="navbar pi-navbar">
      <div className="nav-left">
        <button
          type="button"
          className="pi-mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>

        <span className="nav-logo" onClick={goHome}>
          <span className="pi-logo-text">TriaNXT</span>
        </span>

        <div className="nav-filters">
          <PIEnterpriseDropdown
  options={PI_ROLE_OPTIONS}
  value={navbarData.selectedRole || "Principal Investigator"}
  onChange={handleRoleChange}
  placeholder="Select Role"
  searchable={false}
  className="pi-role-dropdown"
  ariaLabel="PI Role"
/>
          
        <PIEnterpriseDropdown
  options={INDICATION_OPTIONS}
  value={selectedIndication}
  onChange={setSelectedIndication}
  placeholder="Indication"
  searchable
  className="pi-indication-dropdown"
  ariaLabel="Indication"
/>
          <span className="institute-tab">{navbarData.institute}</span>
          <PIEnterpriseDropdown
            options={studyOptions}
            value={navbarData.selectedStudy || "All Studies"}
            onChange={handleStudyChange}
            placeholder="All Studies"
            searchable
            className="pi-study-dropdown"
            ariaLabel="Study Filter"
          />
          <PIEnterpriseDropdown
  options={SUBJECT_OPTIONS}
  value={selectedSubject}
  onChange={setSelectedSubject}
  placeholder="Subject"
  searchable
  className="pi-subject-dropdown"
  ariaLabel="Subject"
/>
        </div>
      </div>

      <div className="nav-right">
        <div className="search-pill" ref={searchRef}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((result, i) => (
                <div
                  key={`${result.type}-${result.label}-${i}`}
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(result)}
                >
                  <span className="search-result-type">{result.type}</span>
                  {result.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="nav-link" onClick={goHome}>
          <FaHome />
          <span className="nav-link-label">Home</span>
        </span>

        <span
          className="nav-link"
          onClick={() => setSelectedPage && setSelectedPage("livechat")}
        >
          <FiMessageSquare />
          <span className="nav-link-label">Live Chat</span>
        </span>

        <div className="notification-menu" ref={notifRef}>
          <button
            type="button"
            className="notification-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                <span>
                  Notifications ({notifications.length})
                  {unreadCount > 0 && (
                    <span className="notification-unread-label">
                      {" "}
                      · {unreadCount} unread
                    </span>
                  )}
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="notification-mark-all"
                    onClick={handleMarkAllRead}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="notification-empty">No notifications</div>
              ) : (
                notifications.slice(0, 5).map((n, i) => (
                  <div
                    key={`${n.title}-${i}`}
                    className={`notification-item ${n.read ? "read" : "unread"}`}
                  >
                    <div
                      className="notification-item-body"
                      onClick={() => {
                        setNotifOpen(false);
                        setSelectedPage && setSelectedPage("notifications");
                      }}
                    >
                      <strong>{n.title}</strong>
                      <p>{n.message}</p>
                      <small>{n.date}</small>
                    </div>
                    <button
                      type="button"
                      className="notification-toggle-read"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationClick(i);
                      }}
                    >
                      {n.read ? "Unread" : "Read"}
                    </button>
                  </div>
                ))
              )}
              <div
                className="notification-view-all"
                onClick={() => {
                  setNotifOpen(false);
                  setSelectedPage && setSelectedPage("notifications");
                }}
              >
                View All Notifications
              </div>
            </div>
          )}
        </div>

        <div className="user-menu" ref={profileRef}>
          <span className="welcome" onClick={() => setProfileOpen(!profileOpen)}>
            👤 {navbarData.userName} ▾
          </span>

          {profileOpen && (
            <div className="dropdown">
              <div onClick={() => goToSettings("security")}>
                Account Security
              </div>
              <div onClick={() => goToSettings("profile")}>My Profile</div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PINavbar;
