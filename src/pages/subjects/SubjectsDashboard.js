// newly added

import { useNavigate } from "react-router-dom";
import "./SubjectsDashboard.css";

function SubjectsDashboard() {
  const navigate = useNavigate();

  const subjects = [
    {
      id: "SUB-001",
      initials: "JD",
      study: "OBETICHOLIC ACID (OCA)",
      site: "Apollo Hospital",
      status: "Active",
      enrollmentDate: "2026-06-01",
      pi: "Dr. Rajesh Kumar",
    },
    {
      id: "SUB-002",
      initials: "SK",
      study: "SeptiTest",
      site: "Apollo Hospital",
      status: "Screening",
      enrollmentDate: "2026-06-03",
      pi: "Dr. Rajesh Kumar",
    },
    {
      id: "SUB-003",
      initials: "AR",
      study: "Headache Study",
      site: "City Hospital",
      status: "Completed",
      enrollmentDate: "2026-05-15",
      pi: "Dr. Priya Sharma",
    },
  ];

  return (
    <div className="subjects-page">

      <div className="subjects-header">
        <h1>Subjects</h1>
        <button>
          + Add Subject
        </button>
      </div>

      <div className="subjects-kpis">

        <div className="subject-kpi">
          <h2>245</h2>
          <p>Total Subjects</p>
        </div>

        <div className="subject-kpi">
          <h2>180</h2>
          <p>Active</p>
        </div>

        <div className="subject-kpi">
          <h2>45</h2>
          <p>Screening</p>
        </div>

        <div className="subject-kpi">
          <h2>20</h2>
          <p>Completed</p>
        </div>

      </div>

      <div className="subjects-table-card">

        <table>

          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Initials</th>
              <th>Study</th>
              <th>Site</th>
              <th>Principal Investigator</th>
              <th>Status</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {subjects.map(subject => (

              <tr key={subject.id}>

                <td>{subject.id}</td>
                <td>{subject.initials}</td>
                <td>{subject.study}</td>
                <td>{subject.site}</td>
                <td>{subject.pi}</td>
                <td>{subject.status}</td>
                <td>{subject.enrollmentDate}</td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        `/subject/${subject.id}`
                      )
                    }
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SubjectsDashboard;