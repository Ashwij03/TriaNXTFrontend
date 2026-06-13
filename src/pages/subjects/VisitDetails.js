// newly added

import React, { useState } from "react";
import "./VisitDetails.css";

function VisitDetails({ setActiveTab }) {

  const visit =
    JSON.parse(
      localStorage.getItem(
        "selectedVisit"
      )
    ) || {};

  const [activeSection, setActiveSection] =
    useState("overview");

  return (

    <div className="visit-details-page">

      <div className="visit-header">

        <button
          className="back-btn"
          onClick={() =>
            setActiveTab("Visits")
          }
        >
          ← Back To Visits
        </button>

        <div className="visit-status">
          {visit.status || "Scheduled"}
        </div>

      </div>

      <div className="visit-title">

        <h1>
          {visit.name || "Visit"}
        </h1>

        <p>
          Visit Workspace
        </p>

      </div>

      <div className="visit-kpis">

        <div className="visit-kpi-card">
          <h3>
            {visit.status || "Scheduled"}
          </h3>
          <p>Status</p>
        </div>

        <div className="visit-kpi-card">
          <h3>
            {visit.plannedDate || "-"}
          </h3>
          <p>Planned Date</p>
        </div>

        <div className="visit-kpi-card">
          <h3>
            {visit.actualDate || "-"}
          </h3>
          <p>Actual Date</p>
        </div>

        <div className="visit-kpi-card">
          <h3>0</h3>
          <p>Documents</p>
        </div>

      </div>

      <div className="visit-tabs">

        <button
          className={
            activeSection === "overview"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "overview"
            )
          }
        >
          Overview
        </button>

        <button
          className={
            activeSection === "procedures"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "procedures"
            )
          }
        >
          Procedures
        </button>

        <button
          className={
            activeSection === "documents"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "documents"
            )
          }
        >
          Documents
        </button>

        <button
          className={
            activeSection === "queries"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "queries"
            )
          }
        >
          Queries
        </button>

        <button
          className={
            activeSection === "audit"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveSection(
              "audit"
            )
          }
        >
          Audit Trail
        </button>

      </div>

      <div className="visit-content">

        {activeSection === "overview" && (

          <div className="visit-card">

            <h2>
              Visit Information
            </h2>

            <div className="visit-grid">

              <div>
                <label>
                  Visit Name
                </label>
                <p>
                  {visit.name}
                </p>
              </div>

              <div>
                <label>
                  Planned Date
                </label>
                <p>
                  {visit.plannedDate}
                </p>
              </div>

              <div>
                <label>
                  Actual Date
                </label>
                <p>
                  {visit.actualDate || "-"}
                </p>
              </div>

              <div>
                <label>
                  Status
                </label>
                <p>
                  {visit.status}
                </p>
              </div>

            </div>

          </div>

        )}

        {activeSection === "procedures" && (

          <div className="visit-card">

            <h2>
              Procedures
            </h2>

            <table>

              <thead>
                <tr>
                  <th>Procedure</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Blood Pressure</td>
                  <td>Pending</td>
                </tr>

                <tr>
                  <td>ECG</td>
                  <td>Pending</td>
                </tr>

              </tbody>

            </table>

          </div>

        )}

        {activeSection === "documents" && (

          <div className="visit-card">

            <h2>
              Documents
            </h2>

            <p>
              No Documents Available
            </p>

          </div>

        )}

        {activeSection === "queries" && (

          <div className="visit-card">

            <h2>
              Queries
            </h2>

            <p>
              No Open Queries
            </p>

          </div>

        )}

        {activeSection === "audit" && (

          <div className="visit-card">

            <h2>
              Audit Trail
            </h2>

            <p>
              No Audit Events Found
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default VisitDetails;