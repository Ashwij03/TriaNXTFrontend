import "./StudyWorkspaceTabs.css";

function StudyWorkspaceTabs({
  activeTab,
  setActiveTab
}) {


  const tabs = [
    "Overview",
    "Subjects",
    "Visits",
    "Documents",
    "Queries",
    "Regulatory",
    "Reports"
 ];

  return (

    <div className="workspace-header">


      <div className="workspace-tabs">

        {tabs.map((tab) => (

          <button
            key={tab}
            className={
              activeTab === tab
                ? "workspace-tab active"
                : "workspace-tab"
            }
            onClick={() =>
              setActiveTab(tab)
            }
          >
            {tab}
          </button>

        ))}

      </div>

    </div>

  );
}

export default StudyWorkspaceTabs;