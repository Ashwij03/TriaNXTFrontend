import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StudySubjects.css";

function StudySubjects({setActiveTab}) {

  const { id: studyId } = useParams();

  const [showModal, setShowModal] = useState(false);
  
  const [newSubject, setNewSubject] = useState({
    id: "",
    initials: "",
    status: "Screening",
    screeningDate: "",
    enrollmentDate: "",
    currentVisit: "Screening",
    pi: "",
    site: ""
  });

  const defaultSubjects = [
  {
    id: "SUB-001",
    initials: "RA",
    status: "Active",
    screeningDate: "2026-06-01",
    enrollmentDate: "2026-06-05",
    currentVisit: "Visit 3",
    pi: "Dr. Richard Thomas",
    site: "Apollo Hospital"
  },
  {
    id: "SUB-002",
    initials: "AK",
    status: "Screening",
    screeningDate: "2026-06-03",
    enrollmentDate: "-",
    currentVisit: "Screening",
    pi: "Dr. Richard Thomas",
    site: "Apollo Hospital"
  }
];

const [subjectsData, setSubjectsData] = useState(() => {

  const storedSubjects =
    localStorage.getItem("subjects");

  return storedSubjects
    ? JSON.parse(storedSubjects)
    : defaultSubjects;

});

const [searchTerm, setSearchTerm] = useState("");

const filteredSubjects = subjectsData.filter((subject) =>
  subject.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  subject.initials.toLowerCase().includes(searchTerm.toLowerCase()) ||
  subject.pi.toLowerCase().includes(searchTerm.toLowerCase()) ||
  subject.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
  subject.status.toLowerCase().includes(searchTerm.toLowerCase())
);

useEffect(() => {

  localStorage.setItem(
    "subjects",
    JSON.stringify(subjectsData)
  );

}, [subjectsData]);

  return (

    <div className="subjects-module">

        <button
          className="back-btn"
          onClick={() =>
            setActiveTab("Overview")
          }
        >
          ← Back
        </button>

      <div className="subjects-header">
        

        <h2>
          Subjects
        </h2>

        <button
          className="add-subject-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Subject
        </button>

      </div>

      <div className="subjects-kpis">

        <div className="subject-kpi">
          <h3>{subjectsData.length}</h3>
          <p>Total Subjects</p>
        </div>

        <div className="subject-kpi">
          <h3>{subjectsData.filter(s => s.status === "Active").length}</h3>
          <p>Active</p>
        </div>

        <div className="subject-kpi">
          <h3>{subjectsData.filter(s => s.status === "Screening").length}</h3>
          <p>Screening</p>
        </div>

        <div className="subject-kpi">
            <h3>{subjectsData.filter(s => s.status === "Completed").length}</h3>
            <p>Completed</p>
        </div>

      </div>

      <div className="subject-search-bar">

        <input
          type="text"
          placeholder="Search by Subject ID, PI, Site, Status..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      <div className="subject-table-card">

        <table>

          <thead>

            <tr>

              <th>Subject ID</th>
              <th>Initials</th>
              <th>Status</th>
              <th>PI</th>
              <th>Site</th>
              <th>Screening</th>
              <th>Enrollment</th>
              <th>Current Visit</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredSubjects.length > 0 ? (
            
              filteredSubjects.map(subject => (
              
                <tr key={subject.id}>
                
                  <td>{subject.id}</td>
                  <td>{subject.initials}</td>
                  <td>{subject.status}</td>
                  <td>{subject.pi}</td>
                  <td>{subject.site}</td>
                  <td>{subject.screeningDate}</td>
                  <td>{subject.enrollmentDate}</td>
                  <td>{subject.currentVisit}</td>
              
                  <td>
              
                    <button
                      className="view-btn"
                      onClick={() => {
                      
                        localStorage.setItem(
                          "selectedSubject",
                          JSON.stringify({
                            ...subject,
                            studyId
                          })
                        );
                      
                        setActiveTab(
                          "SubjectProfile"
                        );
                      
                      }}
                    >
                      View
                    </button>
                    
                  </td>
                    
                </tr>
          
              ))
            
            ) : (
            
              <tr>
              
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#64748b"
                  }}
                >
                  No subjects found
                </td>
                
              </tr>
          
            )}
          
          </tbody>

        </table>

      </div>

      {
         showModal && (
        
           <div className="subject-modal-overlay">
            
             <div className="subject-modal">
        
               <h3>Add New Subject</h3>
        
               <input
                 placeholder="Subject ID"
                 value={newSubject.id}
                 onChange={(e) =>
                   setNewSubject({
                     ...newSubject,
                     id: e.target.value
                   })
                 }
               />
        
               <input
                 placeholder="Initials"
                 value={newSubject.initials}
                 onChange={(e) =>
                   setNewSubject({
                     ...newSubject,
                     initials: e.target.value
                   })
                 }
               />
        
               <input
                 placeholder="Principal Investigator"
                 value={newSubject.pi}
                 onChange={(e) =>
                   setNewSubject({
                     ...newSubject,
                     pi: e.target.value
                   })
                 }
               />
        
               <input
                 placeholder="Site"
                 value={newSubject.site}
                 onChange={(e) =>
                   setNewSubject({
                     ...newSubject,
                     site: e.target.value
                   })
                 }
               />
        
               <div className="form-group">

                  <label>
                    Screening Date
                  </label>

                  <input
                    type="date"
                    value={newSubject.screeningDate}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        screeningDate: e.target.value
                      })
                    }
                  />

                </div>
                
                <div className="form-group">
                
                  <label>
                    Enrollment Date
                  </label>
                
                  <input
                    type="date"
                    value={newSubject.enrollmentDate}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        enrollmentDate: e.target.value
                      })
                    }
                  />

                </div>
        
               <select
                 value={newSubject.status}
                 onChange={(e) =>
                   setNewSubject({
                     ...newSubject,
                     status: e.target.value
                   })
                 }
               >
                 <option>Screening</option>
                 <option>Active</option>
                 <option>Completed</option>
               </select>
             
               <div className="modal-actions">
             
                 <button
                   onClick={() => {
                    
                     setSubjectsData([
                       ...subjectsData,
                       newSubject
                     ]);
                 
                     setShowModal(false);
                 
                     setNewSubject({
                       id: "",
                       initials: "",
                       status: "Screening",
                       screeningDate: "",
                       enrollmentDate: "",
                       currentVisit: "Screening",
                       pi: "",
                       site: ""
                     });
                 
                   }}
                 >
                   Add Subject
                 </button>
               
                 <button
                   onClick={() =>
                     setShowModal(false)
                   }
                 >
                   Cancel
                 </button>
               
               </div>
               
             </div>
               
           </div>
        
         )
        }

    </div>

  );
}

export default StudySubjects;
