import { useState } from "react";
import "./CROOversight.css";

function CROReport() {
  const [reportStatus, setReportStatus] = useState("");

  const generateReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      type: "CRO Oversight Summary",
      format: "xlsx"
    };

    localStorage.setItem("lastCROReport", JSON.stringify(report));
    setReportStatus("Report generated successfully. Ready for Excel download.");
  };

  const downloadReport = () => {
    const report = JSON.parse(localStorage.getItem("lastCROReport") || "null");

    if (!report) {
      setReportStatus("Generate a report first before downloading.");
      return;
    }

    const rows = [
      ["CRO Oversight Report"],
      ["Generated", report.generatedAt],
      ["Format", "Excel (.xlsx)"],
      [],
      ["CRO ID", "Organization", "Studies", "Sites", "Status"]
    ];

    const contracts =
      JSON.parse(localStorage.getItem("croContracts") || "null") || [
        ["CRO-001", "ClinTech Research", 3, 8, "Active"],
        ["CRO-002", "Global CRO Partners", 2, 5, "Active"]
      ];

    contracts.forEach((row) => {
      if (Array.isArray(row)) {
        rows.push(row);
      } else {
        rows.push([
          row.id,
          row.name,
          row.studies,
          row.sites,
          row.status
        ]);
      }
    });

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cro-oversight-report-${Date.now()}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
    setReportStatus("Excel report downloaded.");
  };

  return (
    <div className="quick-actions">
      <h2>CRO Reports</h2>
      <div className="action-buttons">
        <button type="button" onClick={generateReport}>
          Generate Report
        </button>
        <button type="button" onClick={downloadReport}>
          Download Report (Excel)
        </button>
      </div>
      {reportStatus && <p style={{ marginTop: 16, color: "#374151" }}>{reportStatus}</p>}
    </div>
  );
}

export default CROReport;
