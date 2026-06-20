import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";
import SearchableDropdown from "../common/SearchableDropdown";
import {
  FiHome,
  FiMessageSquare,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiSliders
} from "react-icons/fi";
import { getNotifications } from "../../services/adminService";
import { getStudyByCode } from "../../services/studyService";
import ROLES from "../../constants/roles";
import {
  getAllRoles,
  getCurrentUser,
  getDashboardPath,
  getEffectiveRole,
  getUserProfile,
  isAdmin,
  ROLE_LABELS,
  setAdminPreviewRole,
  SWITCHABLE_ROLE_DASHBOARDS
} from "../../services/roleService";
import { PROFILE_PHOTO_EVENT } from "../../constants/profileEvents";
import {
  terminateCurrentSession,
  touchUserSession
} from "../../services/sessionService";
import {
  ADMIN_PREVIEW_ROLE_EVENT,
  clearDependentFilters,
  HEADER_FILTERS_EVENT,
  SELECTED_CRO_KEY,
  SELECTED_INDICATION_KEY,
  SELECTED_INSTITUTION_KEY,
  SELECTED_SITE_NUMBER_KEY,
  SELECTED_SPONSOR_KEY,
  SELECTED_STUDY_FILTER_KEY,
  getStoredCROFilter,
  getStoredIndicationFilter,
  getStoredInstitutionFilter,
  getStoredSiteNumberFilter,
  getStoredSponsorFilter,
  getStoredStudyFilter,
  getStoredSubjectFilter,
  setStoredCROFilter,
  setStoredIndicationFilter,
  setStoredInstitutionFilter,
  setStoredSiteNumberFilter,
  setStoredSponsorFilter,
  setStoredStudyFilter,
  setStoredSubjectFilter
} from "../../constants/headerFilters";
import {
  getCROOptions,
  getDefaultInstitution,
  getIndicationOptions,
  getInstitutionOptions,
  getSiteNumberOptions,
  getSponsorOptions,
  getStudyOptions,
  getSubjectOptions
} from "../../services/filterService";

const FILTER_ORDERS = {
  [ROLES.SPONSOR]: [
    "cro",
    "indication",
    "study",
    "siteNumber",
    "siteName",
    "subject"
  ],
  [ROLES.CRO]: [
    "sponsor",
    "indication",
    "study",
    "siteNumber",
    "siteName",
    "subject"
  ],
  [ROLES.PI]: ["indication", "sponsor", "cro", "study", "subject"],
  [ROLES.SITE_STAFF]: ["indication", "sponsor", "cro", "study", "subject"],
  [ROLES.ADMIN]: [
    "role",
    "indication",
    "siteNumber",
    "siteName",
    "study",
    "subject"
  ]
};

const FILTER_LABELS = {
  role: "Role",
  indication: "Indication",
  sponsor: "Sponsor",
  cro: "CRO",
  siteNumber: "Site Number",
  siteName: "Institution",
  study: "Study Number",
  subject: "Subject Number"
};

const ROLE_BADGE_CLASSES = {
  [ROLES.ADMIN]: "role-badge--admin",
  [ROLES.SITE_STAFF]: "role-badge--site-staff",
  [ROLES.PI]: "role-badge--pi",
  [ROLES.CRO]: "role-badge--cro",
  [ROLES.SPONSOR]: "role-badge--sponsor"
};

function DashboardHeader({ onToggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userIsAdmin = isAdmin(currentUser);
  const effectiveRole = getEffectiveRole(currentUser) || ROLES.ADMIN;

  const [profileOpen, setProfileOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterVersion, setFilterVersion] = useState(0);
  const [previewRole, setPreviewRoleState] = useState(
    () => effectiveRole || ROLES.ADMIN
  );
  const [profilePhoto, setProfilePhoto] = useState(
    () => getUserProfile(currentUser).profilePhoto || ""
  );

  const [selectedIndication, setSelectedIndication] = useState(
    getStoredIndicationFilter
  );
  const [selectedSponsor, setSelectedSponsor] = useState(getStoredSponsorFilter);
  const [selectedCRO, setSelectedCRO] = useState(getStoredCROFilter);
  const [selectedInstitution, setSelectedInstitution] = useState(
    () => getStoredInstitutionFilter() || getDefaultInstitution(currentUser)
  );
  const [selectedSiteNumber, setSelectedSiteNumber] = useState(
    getStoredSiteNumberFilter
  );
  const [selectedStudyCode, setSelectedStudyCode] = useState(
    getStoredStudyFilter
  );
  const [selectedSubject, setSelectedSubject] = useState(getStoredSubjectFilter);

  const filterOrder = userIsAdmin
    ? FILTER_ORDERS[ROLES.ADMIN]
    : FILTER_ORDERS[effectiveRole] || FILTER_ORDERS[ROLES.ADMIN];

  const indicationOptions = useMemo(() => {
    void filterVersion;
    return getIndicationOptions(currentUser);
  }, [currentUser, filterVersion]);
  const sponsorOptions = useMemo(() => {
    void filterVersion;
    return getSponsorOptions(currentUser);
  }, [currentUser, filterVersion]);
  const croOptions = useMemo(() => {
    void filterVersion;
    return getCROOptions(currentUser);
  }, [currentUser, filterVersion]);
  const institutionOptions = useMemo(() => {
    void filterVersion;
    return getInstitutionOptions(currentUser);
  }, [currentUser, filterVersion]);
  const siteNumberOptions = useMemo(() => {
    void filterVersion;
    return getSiteNumberOptions(currentUser);
  }, [currentUser, filterVersion]);
  const studyOptions = useMemo(() => {
    void filterVersion;
    return getStudyOptions(currentUser);
  }, [currentUser, filterVersion]);
  const subjectOptions = useMemo(() => {
    void filterVersion;
    return getSubjectOptions(currentUser);
  }, [currentUser, filterVersion]);
  const roleOptions = useMemo(() => getAllRoles(), []);

  useEffect(() => {
    touchUserSession(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const refreshProfilePhoto = () => {
      setProfilePhoto(getUserProfile(currentUser).profilePhoto || "");
    };

    window.addEventListener(PROFILE_PHOTO_EVENT, refreshProfilePhoto);

    return () => {
      window.removeEventListener(PROFILE_PHOTO_EVENT, refreshProfilePhoto);
    };
  }, [currentUser]);

  useEffect(() => {
    const bumpFilters = () => setFilterVersion((value) => value + 1);

    window.addEventListener(HEADER_FILTERS_EVENT, bumpFilters);
    window.addEventListener(ADMIN_PREVIEW_ROLE_EVENT, bumpFilters);

    return () => {
      window.removeEventListener(HEADER_FILTERS_EVENT, bumpFilters);
      window.removeEventListener(ADMIN_PREVIEW_ROLE_EVENT, bumpFilters);
    };
  }, []);

  useEffect(() => {
    const handlePreviewRoleChange = () => {
      setPreviewRoleState(getEffectiveRole(currentUser) || ROLES.ADMIN);
    };

    window.addEventListener(ADMIN_PREVIEW_ROLE_EVENT, handlePreviewRoleChange);

    return () => {
      window.removeEventListener(
        ADMIN_PREVIEW_ROLE_EVENT,
        handlePreviewRoleChange
      );
    };
  }, [currentUser]);

  const unreadNotifications = getNotifications().filter((item) => !item.read)
    .length;

  const handleLogout = () => {
    terminateCurrentSession();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setAdminPreviewRole(null);
    navigate("/login");
  };

  const openStudy = (study) => {
    if (!study) {
      return;
    }

    localStorage.setItem("selectedStudy", JSON.stringify(study));
    navigate(`/study-dashboard/${study.code}`);
  };

  const handleRoleChange = (nextRole) => {
    if (!nextRole || !userIsAdmin) {
      return;
    }

    if (nextRole === ROLES.ADMIN) {
      setAdminPreviewRole(null);
      setPreviewRoleState(ROLES.ADMIN);
      navigate("/admin-dashboard");
      return;
    }

    if (SWITCHABLE_ROLE_DASHBOARDS.includes(nextRole)) {
      setAdminPreviewRole(nextRole);
      setPreviewRoleState(nextRole);
      navigate(getDashboardPath(nextRole));
    }
  };

  const handleStudyChange = (code) => {
    setSelectedStudyCode(code);
    setStoredStudyFilter(code);
    clearDependentFilters(SELECTED_STUDY_FILTER_KEY);
    setSelectedSubject("");
    openStudy(getStudyByCode(code));
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    setStoredSubjectFilter(subjectId);

    if (subjectId) {
      navigate(`/subject/${subjectId}`);
    }
  };

  const updateFilter = (key, value, setter) => {
    setter(value);

    const storageMap = {
      indication: [SELECTED_INDICATION_KEY, setStoredIndicationFilter],
      sponsor: [SELECTED_SPONSOR_KEY, setStoredSponsorFilter],
      cro: [SELECTED_CRO_KEY, setStoredCROFilter],
      siteName: [SELECTED_INSTITUTION_KEY, setStoredInstitutionFilter],
      siteNumber: [SELECTED_SITE_NUMBER_KEY, setStoredSiteNumberFilter]
    };

    const entry = storageMap[key];

    if (entry) {
      entry[1](value);
      clearDependentFilters(entry[0]);
      setFilterVersion((current) => current + 1);
    }

    if (key === "siteName") {
      setSelectedSiteNumber("");
      setSelectedStudyCode("");
      setSelectedSubject("");
    }

    if (key === "siteNumber") {
      setSelectedStudyCode("");
      setSelectedSubject("");
    }

    if (key === "indication" || key === "sponsor" || key === "cro") {
      setSelectedStudyCode("");
      setSelectedSubject("");
    }
  };

  const renderFilterControl = (filterKey) => {
    switch (filterKey) {
      case "role":
        return userIsAdmin ? (
          <SearchableDropdown
            value={previewRole}
            onChange={handleRoleChange}
            options={roleOptions}
            placeholder="Select Role"
            searchPlaceholder="Search Role"
            className="header-dropdown"
          />
        ) : (
          <span className="header-static-value">
            {ROLE_LABELS[currentUser?.role] || currentUser?.role || "—"}
          </span>
        );
      case "indication":
        return (
          <SearchableDropdown
            value={selectedIndication}
            onChange={(value) =>
              updateFilter("indication", value, setSelectedIndication)
            }
            options={[
              { value: "", label: "All Indications" },
              ...indicationOptions
            ]}
            placeholder="All Indications"
            searchPlaceholder="Search Indication"
            className="header-dropdown"
          />
        );
      case "sponsor":
        return (
          <SearchableDropdown
            value={selectedSponsor}
            onChange={(value) =>
              updateFilter("sponsor", value, setSelectedSponsor)
            }
            options={[
              { value: "", label: "All Sponsors" },
              ...sponsorOptions
            ]}
            placeholder="All Sponsors"
            searchPlaceholder="Search Sponsor"
            className="header-dropdown"
          />
        );
      case "cro":
        return (
          <SearchableDropdown
            value={selectedCRO}
            onChange={(value) => updateFilter("cro", value, setSelectedCRO)}
            options={[{ value: "", label: "All CROs" }, ...croOptions]}
            placeholder="All CROs"
            searchPlaceholder="Search CRO"
            className="header-dropdown"
          />
        );
      case "study":
        return (
          <SearchableDropdown
            value={selectedStudyCode}
            onChange={handleStudyChange}
            options={studyOptions}
            placeholder="Select Study"
            searchPlaceholder="Search Study Number"
            className="header-dropdown"
          />
        );
      case "siteName":
        return (
          <SearchableDropdown
            value={selectedInstitution}
            onChange={(value) =>
              updateFilter("siteName", value, setSelectedInstitution)
            }
            options={institutionOptions}
            placeholder="All Institutions"
            searchPlaceholder="Search Institution"
            className="header-dropdown"
          />
        );
      case "siteNumber":
        return (
          <SearchableDropdown
            value={selectedSiteNumber}
            onChange={(value) =>
              updateFilter("siteNumber", value, setSelectedSiteNumber)
            }
            options={siteNumberOptions}
            placeholder="All Site Numbers"
            searchPlaceholder="Search Site Number"
            className="header-dropdown"
          />
        );
      case "subject":
        return (
          <SearchableDropdown
            value={selectedSubject}
            onChange={handleSubjectChange}
            options={subjectOptions}
            placeholder="Select Subject"
            searchPlaceholder="Search Subject"
            className="header-dropdown"
          />
        );
      default:
        return null;
    }
  };

  const dashboardPath = getDashboardPath(effectiveRole);
  const badgeRole = userIsAdmin ? ROLES.ADMIN : currentUser?.role;
  const badgeLabel =
    ROLE_LABELS[badgeRole] || badgeRole || "User";
  const badgeClass =
    ROLE_BADGE_CLASSES[badgeRole] || "role-badge--default";
  const profileRoleLabel = userIsAdmin
    ? ROLE_LABELS[ROLES.ADMIN]
    : ROLE_LABELS[currentUser?.role] || currentUser?.role || "User";

  return (
    <div className="enterprise-header">
      <div className="header-unified-row">
        <button
          type="button"
          className="header-menu-toggle"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <FiMenu />
        </button>

        <div className="header-identity-inline">
          <span className="header-welcome-text">Welcome</span>
          <span className={`role-badge ${badgeClass}`}>{badgeLabel}</span>
          <span className="header-username-inline">
            {currentUser?.name || "User"}
          </span>
        </div>

        <button
          type="button"
          className="header-filter-toggle"
          onClick={() => setFiltersOpen((prev) => !prev)}
          aria-label="Toggle filters"
          aria-expanded={filtersOpen}
        >
          <FiSliders />
          <span>Filters</span>
        </button>

        <div className={`header-filters-grid${filtersOpen ? " is-open" : ""}`}>
          {filterOrder.map((filterKey) => (
            <div className="header-filter-column" key={filterKey}>
              <div className="header-filter-heading">
                {FILTER_LABELS[filterKey] || filterKey}
              </div>
              <div className="header-filter-control">{renderFilterControl(filterKey)}</div>
            </div>
          ))}
        </div>

        <div className="header-right">
          <div className="header-menu">
            <span
              onClick={() => navigate(dashboardPath)}
              style={{ cursor: "pointer" }}
            >
              <FiHome />
              Home
            </span>

            <span style={{ cursor: "pointer" }}>
              <FiMessageSquare />
              Live Chat
            </span>

            <span
              className="notification-badge"
              onClick={() => navigate("/notifications")}
              style={{ cursor: "pointer" }}
            >
              <FiBell />
              {unreadNotifications > 0 && <small>{unreadNotifications}</small>}
            </span>
          </div>

          <div
            className="profile-section"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="profile-avatar">
              {profilePhoto ? (
                <img src={profilePhoto} alt="" className="profile-avatar-img" />
              ) : (
                currentUser?.name?.charAt(0)?.toUpperCase()
              )}
            </div>

            <div>
              <div className="profile-name">{currentUser?.name}</div>
              <div className="profile-role">{profileRoleLabel}</div>
            </div>

            <span>
              <FiChevronDown />
            </span>

            {profileOpen && (
              <div className="profile-dropdown">
                <div onClick={() => navigate("/profile")}>Profile</div>
                <div onClick={() => navigate("/settings")}>
                  Account Settings
                </div>
                <div onClick={() => navigate("/security")}>Security</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
