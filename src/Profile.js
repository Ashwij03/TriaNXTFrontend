import Navbar from "./Navbar";
import "./Dashboard.css";
import { useState } from "react";

function Profile() {
  const [, setSelectedPage] = useState("home");

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #ddd",
    gap: "40px",
  };

  const labelStyle = {
    fontSize: "17px",
    fontWeight: "600",
    color: "#555",
    width: "220px",
  };

  const valueStyle = {
    fontSize: "17px",
    fontWeight: "500",
    color: "#000",
  };

  return (
    <>
      <Navbar setSelectedPage={setSelectedPage} />

      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>

        <div
          className="profile-card pdf-style"
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar */}
          <div
            className="profile-avatar"
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              className="avatar-circle"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "#f26b1d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                color: "#fff",
              }}
            >
              👤
            </div>
          </div>

          {/* Profile details */}
          <div
            className="profile-details"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "50px",
              flexWrap: "wrap",
            }}
          >
            {/* Left Column */}
            <div className="profile-column" style={{ flex: 1 }}>
              <div style={rowStyle}>
                <span style={labelStyle}>Email Address</span>
                <span style={valueStyle}>sruthi@gmail.com</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Office Phone</span>
                <span style={valueStyle}>-</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Cell Phone</span>
                <span style={valueStyle}>-</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Fax</span>
                <span style={valueStyle}>-</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Professional Headline</span>
                <span style={valueStyle}>-</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Preferred Language</span>
                <span style={valueStyle}>English</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="profile-column" style={{ flex: 1 }}>
              <div style={rowStyle}>
                <span style={labelStyle}>First Name</span>
                <span style={valueStyle}>Sruthi</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Last Name</span>
                <span style={valueStyle}>Bomminayuni</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Middle Name</span>
                <span style={valueStyle}>-</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Credentials</span>
                <span style={valueStyle}>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;