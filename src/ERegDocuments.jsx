import { useState } from "react";
import "./ERegDocuments.css";

export default function ERegDocuments({ setSelectedDoc }) {

  const [selectedFolder, setSelectedFolder] = useState("Test");

  const folders = ["CREDENTIALS", "TRAINING", "Test"];

  const documents = {
    Test: ["Maxine Test.pdf", "Report.pdf"],
    TRAINING: ["Training Doc.pdf"],
    CREDENTIALS: ["Credential.pdf"]
  };

  return (
    <div className="docs-container">

      {/* LEFT */}
      <div className="left-panel">
        <p className="folder-title">Study Documents</p>

        {folders.map((folder) => (
          <div
            key={folder}
            className={`folder ${selectedFolder === folder ? "active" : ""}`}
            onClick={() => setSelectedFolder(folder)}
          >
            📁 {folder}
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="right-panel">

        <div className="docs-header">
          <h4>{selectedFolder}</h4>
          <input placeholder="Search Documents..." />
        </div>

        <p>{documents[selectedFolder].length} files</p>

        {documents[selectedFolder].map((doc, index) => (
          <div
            key={index}
            className="doc-item"
            onClick={() => setSelectedDoc(doc)}
          >
            ⭐ {doc}
          </div>
        ))}

      </div>

    </div>
  );
}