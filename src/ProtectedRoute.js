//newly added

import { Navigate } from "react-router-dom";
import rolePermissions
from "./utils/rolePermissions";

function ProtectedRoute({
  children,
  requiredPermission
}) {

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  if (
    isLoggedIn !== "true"
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    requiredPermission &&
    currentUser?.role !==
      "Admin"
  ) {

    const permissions =
      rolePermissions[
        currentUser?.role] || [];

    if (
      !permissions.includes(
        requiredPermission
      )
    ) {

      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }
  }

  return children;
}

export default ProtectedRoute;

//newly added till here