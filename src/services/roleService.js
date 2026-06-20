// UPDATED: Central role-based access service — scopes data and routes per RBAC docs

import ROLES from "../constants/roles";
import PERMISSIONS from "../constants/permissions";
import rolePermissions from "../utils/rolePermissions";
import {
  getStoredAdminPreviewRole,
  setStoredAdminPreviewRole
} from "../constants/headerFilters";
import { getStudies } from "./studyService";

const SITES_STORAGE_KEY = "sites";

const ORG_TO_SITE = {
  "Apollo Hospitals": "Apollo Hospital",
  "Fortis Healthcare": "Fortis Healthcare",
  "Manipal Hospitals": "City Hospital",
  "Max Healthcare": "City Hospital",
  "Aster Hospitals": "Fortis Healthcare"
};

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch {
    return null;
  }
}

export function getAssignedSite(user = getCurrentUser()) {
  if (!user) {
    return null;
  }

  if (user.role === ROLES.ADMIN) {
    return null;
  }

  return (
    user.assignedSite ||
    ORG_TO_SITE[user.orgType] ||
    user.orgType ||
    user.site ||
    null
  );
}

export function isAdmin(user = getCurrentUser()) {
  return user?.role === ROLES.ADMIN;
}

export function getAdminPreviewRole() {
  return getStoredAdminPreviewRole() || null;
}

export function setAdminPreviewRole(role) {
  if (!role || role === ROLES.ADMIN) {
    setStoredAdminPreviewRole("");
    return;
  }

  setStoredAdminPreviewRole(role);
}

export function getEffectiveRole(user = getCurrentUser()) {
  if (!user) {
    return null;
  }

  if (isAdmin(user)) {
    return getAdminPreviewRole() || ROLES.ADMIN;
  }

  return user.role;
}

export function getEffectiveUser(user = getCurrentUser()) {
  if (!user) {
    return null;
  }

  const effectiveRole = getEffectiveRole(user);

  if (effectiveRole === user.role) {
    return user;
  }

  return {
    ...user,
    role: effectiveRole
  };
}

export function isAdminViewingAsRole(user = getCurrentUser()) {
  return isAdmin(user) && getEffectiveRole(user) !== ROLES.ADMIN;
}

export function hasPermission(permission, user = getCurrentUser()) {
  if (!user) {
    return false;
  }

  const effectiveRole = getEffectiveRole(user);

  if (effectiveRole === ROLES.ADMIN || user.permissions?.includes("*")) {
    return true;
  }

  const permissions = rolePermissions[effectiveRole] || [];
  return permissions.includes(permission);
}

export function getDashboardPath(role) {
  switch (role) {
    case ROLES.ADMIN:
      return "/admin-dashboard";
    case ROLES.SITE_STAFF:
      return "/site-staff-dashboard";
    case ROLES.PI:
      return "/pi-dashboard";
    case ROLES.CRO:
      return "/cro-dashboard";
    case ROLES.SPONSOR:
      return "/sponsor-dashboard";
    default:
      return "/dashboard";
  }
}

function readSitesFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(localStorage.getItem(SITES_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function getAccessibleSites(user = getCurrentUser()) {
  const sites = readSitesFromStorage();

  if (isAdmin(user)) {
    return sites;
  }

  const assignedSite = getAssignedSite(user);

  if (!assignedSite) {
    return sites;
  }

  return sites.filter(
    (site) =>
      site.name === assignedSite ||
      site.id === assignedSite ||
      site.name?.includes(assignedSite) ||
      assignedSite?.includes(site.name)
  );
}

export function getAccessibleStudies(user = getCurrentUser()) {
  const studies = getStudies();

  if (isAdmin(user)) {
    return studies;
  }

  const assignedSite = getAssignedSite(user);

  if (!assignedSite) {
    return studies;
  }

  return studies.filter((study) => {
    const studySite = study.site || study.location || "";
    return (
      studySite === assignedSite ||
      studySite.includes(assignedSite) ||
      assignedSite.includes(studySite)
    );
  });
}

// UPDATED: returns studies scoped to an arbitrary site name (used by Admin
// header institution filter, independent of the logged-in user's own site).
export function getStudiesForSite(siteName) {
  const studies = getStudies();

  if (!siteName) {
    return studies;
  }

  return studies.filter((study) => {
    const studySite = study.site || study.location || "";
    return (
      studySite === siteName ||
      studySite.includes(siteName) ||
      siteName.includes(studySite)
    );
  });
}

// UPDATED: role labels + list used to populate the Admin header's role
// switcher dropdown.
export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.SITE_STAFF]: "Site Staff",
  [ROLES.PI]: "Principal Investigator",
  [ROLES.CRO]: "CRO",
  [ROLES.SPONSOR]: "Sponsor"
};

export function getAllRoles() {
  return Object.values(ROLES).map((role) => ({
    value: role,
    label: ROLE_LABELS[role] || role
  }));
}

// UPDATED: roles whose dashboard the Admin header can switch into.
export const SWITCHABLE_ROLE_DASHBOARDS = [
  ROLES.SITE_STAFF,
  ROLES.PI,
  ROLES.CRO,
  ROLES.SPONSOR
];

export function filterBySite(items, siteField = "site", user = getCurrentUser()) {
  if (!Array.isArray(items)) {
    return [];
  }

  if (isAdmin(user)) {
    return items;
  }

  const assignedSite = getAssignedSite(user);

  if (!assignedSite) {
    return items;
  }

  return items.filter((item) => {
    const value = item[siteField] || item.siteName || item.location || "";
    return (
      value === assignedSite ||
      value.includes(assignedSite) ||
      assignedSite.includes(value)
    );
  });
}

export function canAccessRoute(path, user = getCurrentUser()) {
  if (!user) {
    return false;
  }

  const routeUser = getEffectiveUser(user);

  if (routeUser.role === ROLES.ADMIN) {
    return true;
  }

  const routeAccess = {
    "/admin-dashboard": [ROLES.ADMIN],
    "/site-staff-dashboard": [ROLES.SITE_STAFF],
    "/pi-dashboard": [ROLES.PI],
    "/cro-dashboard": [ROLES.CRO],
    "/sponsor-dashboard": [ROLES.SPONSOR],
    "/user-management": [ROLES.ADMIN, ROLES.SITE_STAFF],
    "/permission-approval": [ROLES.ADMIN, ROLES.SITE_STAFF],
    "/access-permission": [ROLES.ADMIN, ROLES.SITE_STAFF],
    "/cro-overview": [ROLES.ADMIN, ROLES.SITE_STAFF, ROLES.CRO],
    "/sites": [ROLES.ADMIN, ROLES.CRO],
    "/site-performance": [
      ROLES.ADMIN,
      ROLES.SITE_STAFF,
      ROLES.PI,
      ROLES.CRO,
      ROLES.SPONSOR
    ],
    "/recruitment": [ROLES.ADMIN, ROLES.SITE_STAFF, ROLES.PI],
    "/regulatory": [
      ROLES.ADMIN,
      ROLES.SITE_STAFF,
      ROLES.PI,
      ROLES.CRO,
      ROLES.SPONSOR
    ],
    "/reports": [
      ROLES.ADMIN,
      ROLES.SITE_STAFF,
      ROLES.PI,
      ROLES.CRO,
      ROLES.SPONSOR
    ],
    "/notifications": Object.values(ROLES),
    "/settings": Object.values(ROLES),
    "/profile": Object.values(ROLES),
    "/security": Object.values(ROLES),
    "/comments": Object.values(ROLES),
    "/studies": Object.values(ROLES),
    "/logs": Object.values(ROLES),
    "/logs/training": Object.values(ROLES),
    "/logs/delegation": Object.values(ROLES),
    "/training": Object.values(ROLES),
    "/delegation": Object.values(ROLES)
  };

  const normalizedPath = path.split("?")[0].replace(/\/$/, "") || "/";

  if (
    normalizedPath.startsWith("/study-dashboard") ||
    normalizedPath.startsWith("/study/") ||
    normalizedPath.startsWith("/subject/") ||
    normalizedPath.startsWith("/visit/")
  ) {
    return true;
  }

  const allowedRoles = routeAccess[normalizedPath];

  if (!allowedRoles) {
    return true;
  }

  return allowedRoles.includes(routeUser.role);
}

export function getUserProfile(user = getCurrentUser()) {
  if (!user) {
    return {};
  }

  const nameParts = String(user.name || "").trim().split(/\s+/);
  const storedProfile = (() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(`profile_${user.id || user.email}`)
        ) || {}
      );
    } catch {
      return {};
    }
  })();

  return {
    email: user.email || "",
    firstName: storedProfile.firstName || nameParts[0] || "",
    lastName: storedProfile.lastName || nameParts.slice(1).join(" ") || "",
    middleName: storedProfile.middleName || "",
    credentials: storedProfile.credentials || "",
    officePhone: storedProfile.officePhone || "",
    cellPhone: storedProfile.cellPhone || "",
    fax: storedProfile.fax || "",
    headline: storedProfile.headline || "",
    department: storedProfile.department || "",
    jobTitle: storedProfile.jobTitle || "",
    bio: storedProfile.bio || "",
    timezone: storedProfile.timezone || "Asia/Kolkata",
    profilePhoto: storedProfile.profilePhoto || "",
    preferredLanguage: storedProfile.preferredLanguage || "English",
    assignedSite: getAssignedSite(user) || "",
    role: user.role || "",
    orgType: user.orgType || ""
  };
}

export function saveUserProfile(profile, user = getCurrentUser()) {
  if (!user) {
    return null;
  }

  const key = `profile_${user.id || user.email}`;
  localStorage.setItem(key, JSON.stringify(profile));

  const fullName = [profile.firstName, profile.middleName, profile.lastName]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return updateCurrentUserProfile({
    name: fullName || user.name,
    assignedSite: profile.assignedSite || user.assignedSite,
    orgType: profile.assignedSite || user.orgType
  });
}

export function getSiteSettings(user = getCurrentUser()) {
  return getUserSettings(user);
}

export function saveSiteSettings(settings, user = getCurrentUser()) {
  return saveUserSettings(settings, user);
}

export function updateCurrentUserProfile(updates) {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  const updatedUser = { ...user, ...updates };
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const index = users.findIndex((u) => u.email === user.email);

  if (index >= 0) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (updates.name) {
    localStorage.setItem("userFullName", updates.name);
  }

  return updatedUser;
}

export function updateUserPassword(currentPassword, newPassword) {
  const user = getCurrentUser();

  if (!user) {
    return { success: false, message: "User account not found." };
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((entry) => entry.email === user.email);

  if (userIndex === -1) {
    return { success: false, message: "User account not found." };
  }

  if (users[userIndex].password !== currentPassword) {
    return { success: false, message: "Current password is incorrect." };
  }

  users[userIndex] = {
    ...users[userIndex],
    password: newPassword
  };
  localStorage.setItem("users", JSON.stringify(users));
  updateCurrentUserProfile({ password: newPassword });
  return { success: true, message: "Password updated successfully." };
}

export function getUserSettingsKey(user = getCurrentUser()) {
  if (isAdmin(user)) {
    return "adminSettings";
  }

  const site = getAssignedSite(user) || "default";
  return `siteSettings_${site.replace(/\s+/g, "_")}`;
}

export function getUserSettings(user = getCurrentUser()) {
  const key = getUserSettingsKey(user);

  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    /* fall through */
  }

  return {
    emailNotifications: true,
    smsNotifications: false,
    dashboardRefresh: "daily",
    preferredLanguage: "English",
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeoutMinutes: isAdmin(user) ? 60 : 30
  };
}

export function saveUserSettings(settings, user = getCurrentUser()) {
  const key = getUserSettingsKey(user);
  localStorage.setItem(key, JSON.stringify(settings));
  return settings;
}

// UPDATED: Sidebar menu items per role — same modules, scoped by site for Site Staff
export function getSidebarMenuItems(user = getCurrentUser()) {
  const effectiveUser = getEffectiveUser(user);

  if (!effectiveUser) {
    return [];
  }

  const allItems = [
    { key: "dashboard", roles: Object.values(ROLES) },
    { key: "studies", roles: Object.values(ROLES) },
    { key: "comments", roles: Object.values(ROLES) },
    { key: "site-performance", roles: Object.values(ROLES) },
    { key: "recruitment", roles: [ROLES.ADMIN, ROLES.SITE_STAFF, ROLES.PI] },
    { key: "regulatory", roles: Object.values(ROLES) },
    { key: "reports", roles: Object.values(ROLES) },
    { key: "user-management", roles: [ROLES.ADMIN, ROLES.SITE_STAFF] },
    { key: "permission-approval", roles: [ROLES.ADMIN, ROLES.SITE_STAFF] },
    { key: "notifications", roles: Object.values(ROLES) },
    { key: "settings", roles: Object.values(ROLES) }
  ];

  return allItems.filter((item) => item.roles.includes(effectiveUser.role));
}

export { ROLES, PERMISSIONS };
