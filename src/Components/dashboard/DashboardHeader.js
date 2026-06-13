//newly added

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./DashboardHeader.css";
import {
  FiHome,
  FiMessageSquare,
  FiBell,
  FiChevronDown
} from "react-icons/fi";

function DashboardHeader() {

  const navigate =
    useNavigate();

  const [profileOpen,
    setProfileOpen] =
    useState(false);

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "currentUser"
    );

    navigate("/login");
  };

  return (

    <div className="enterprise-header">

      {/* LEFT */}

      <div className="header-left">

        <div className="header-filter">

          <label>
            Institution
          </label>

          <select>
            <option>
              Apollo Hospital
            </option>
            
            <option>
              KIMS Hospital
            </option>

            <option>
              Global Hospital
            </option>

            <option>
              City Hospital
            </option>

          </select>

        </div>

        <div className="header-filter">

          <label>
            Role
          </label>

          <select>

            <option>
              Admin
            </option>

            <option>
              Site Staff
            </option>

            <option>
              PI
            </option>

            <option>
              CRO
            </option>

            <option>
              Sponsor
            </option>

          </select>

        </div>

        <div className="header-filter">

          <label>
            Studies
          </label>

          <select>

            <option>
              Orthopedics
            </option>

            <option>
              Cardiology
            </option>

            <option>
              Neurology
            </option>
            
            <option>
              Oncology
            </option>

          </select>

        </div>

      </div>

      {/* RIGHT */}

      <div className="header-right">

        <div className="header-search">

          <input
            type="text"
            placeholder="Search by Subject ID, Visit, etc..."
          />

        </div>

        <div className="header-menu">

          <span onClick={() => navigate("/dashboard")}>
            <>
              <FiHome />
                Home
              </>
          </span>

          <span>
            <>
              <FiMessageSquare />
                Live Chat
              </>
          </span>

          <span className="notification-badge">

            <FiBell />

            {currentUser?.unreadNotifications > 0 && (
              <small>{currentUser.unreadNotifications}</small>
            )}

          </span>

        </div>

        {/* PROFILE */}

        <div
          className="profile-section"
          onClick={() =>
            setProfileOpen(
              !profileOpen
            )
          }
        >

          <div className="profile-avatar">

            {
              currentUser?.name
                ?.charAt(0)
                ?.toUpperCase()
            }

          </div>

          <div>

            <div className="profile-name">

              {
                currentUser?.name
              }

            </div>

            <div className="profile-role">

              {
                currentUser?.role
              }

            </div>

          </div>

          <span>
            <FiChevronDown />
          </span>

          {
            profileOpen && (

              <div className="profile-dropdown">

                <div
                  onClick={() =>
                    navigate(
                      "/profile"
                    )
                  }
                >
                  Profile
                </div>

                <div>
                  Account Settings
                </div>

                <div>
                  Security
                </div>

                <div
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </div>

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;