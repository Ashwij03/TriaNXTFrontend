// UPDATED: Protected route with role-based access control

import { Navigate, useLocation } from "react-router-dom";
import rolePermissions from "./utils/rolePermissions";
import ROLES from "./constants/roles";
import {
  canAccessRoute,
  getAdminPreviewRole,
  getCurrentUser,
  getDashboardPath,
  isAdmin
} from "./services/roleService";

function ProtectedRoute({ children, requiredPermission, allowedRoles }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = getCurrentUser();

  if (isLoggedIn !== "true" || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const previewRole = getAdminPreviewRole();
    const adminPreviewAllowed =
      isAdmin(currentUser) &&
      previewRole &&
      allowedRoles.includes(previewRole);

    if (!adminPreviewAllowed) {
      return (
        <Navigate
          to={getDashboardPath(currentUser.role)}
          replace
        />
      );
    }
  }

  if (
    allowedRoles?.includes(ROLES.ADMIN) &&
    isAdmin(currentUser) &&
    getAdminPreviewRole()
  ) {
    return (
      <Navigate
        to={getDashboardPath(getAdminPreviewRole())}
        replace
      />
    );
  }

  if (!canAccessRoute(location.pathname, currentUser)) {
    return (
      <Navigate
        to={getDashboardPath(
          isAdmin(currentUser)
            ? getAdminPreviewRole() || ROLES.ADMIN
            : currentUser.role
        )}
        replace
      />
    );
  }

  if (
    requiredPermission &&
    currentUser.role !== "Admin"
  ) {
    const permissions =
      rolePermissions[currentUser.role] || [];

    if (!permissions.includes(requiredPermission)) {
      return (
        <Navigate
          to={getDashboardPath(currentUser.role)}
          replace
        />
      );
    }
  }

  return children;
}

export default ProtectedRoute;
