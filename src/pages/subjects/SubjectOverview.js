// newly added

function SubjectOverview({ subject }) {

  return (

    <div className="subject-overview">

      <div className="overview-grid">

        <div className="overview-card">

          <label>Subject ID</label>

          <h3>{subject.id}</h3>

          <p>Active Participant</p>

        </div>

        <div className="overview-card">

          <label>Status</label>

          <h3>{subject.status}</h3>

          <p>Current Subject Status</p>

        </div>

        <div className="overview-card">

          <label>Last Visit</label>

          <h3>{subject.currentVisit}</h3>

          <p>Most Recent Study Visit</p>

        </div>

      </div>

    </div>

  );
}

export default SubjectOverview;