
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import {
  createStudy,
  getStudies,
  // deleteStudy
} from "../../services/studyService";
// import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal";
// import { FiTrash2 } from "react-icons/fi";

import "./Studies.css";

const initialForm = {
  code: "",
  name: "",
  protocol: "",
  location: "",
  site: "",
  enrolled: "",
  targetSubjects: "",
  status: "Active",
  principalInvestigator: "",
  sponsor: "",
  startDate: "",
  description: ""
};

function Studies() {

  const navigate = useNavigate();
  const [studies, setStudies] =
    useState(getStudies);
  const [formOpen, setFormOpen] =
    useState(false);
  const [form, setForm] =
    useState(initialForm);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [studyToDelete, setStudyToDelete] = useState(null);

  const handleChange = (event) => {
    const {
      name,
      value
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const createdStudy =
      createStudy({
        ...form,
        site:
          form.site || form.location,
        protocol:
          form.protocol || form.name
      });

    setStudies(getStudies());
    setForm(initialForm);
    setFormOpen(false);
    navigate(
      `/study-dashboard/${createdStudy.code}`
    );
  };

  // const handleDeleteClick = (e, study) => {
  //   e.stopPropagation();
  //   setStudyToDelete(study);
  //   setShowDeleteModal(true);
  // };

  // const handleConfirmDelete = (deletionDetails) => {
  //   if (studyToDelete) {
  //     try {
  //       deleteStudy(studyToDelete.code, deletionDetails);
  //       setStudies(getStudies());
  //       setShowDeleteModal(false);
  //       setStudyToDelete(null);
  //       alert(`Study "${studyToDelete.name}" has been deleted successfully.`);
  //     } catch (error) {
  //       alert("Error deleting study: " + error.message);
  //     }
  //   }
  // };

  return (

    <DashboardLayout>

      <div className="studies-page">

        <div className="studies-page-header">

          <div>
            <h1>My Studies</h1>
            <p>
              Manage clinical studies and open study dashboards.
            </p>
          </div>

          <button
            className="add-study-btn"
            onClick={() => setFormOpen(true)}
          >
            + Add Study
          </button>

        </div>

        <div className="studies-grid">

          {studies.map((study) => (

            <div
              key={study.code}
              className="study-card"
              onClick={() =>
                navigate(
                  `/study-dashboard/${study.code}`
                )
              }
            >

              {/* <div className="study-card-actions">
                <button
                  className="study-delete-btn"
                  onClick={(e) => handleDeleteClick(e, study)}
                  title="Delete study"
                  aria-label="Delete study"
                >
                  <FiTrash2 />
                </button>
              </div> */}

              <div className="study-image">
                No Image
              </div>

              <h3>
                {study.name}
              </h3>

              <p>
                {study.location}
              </p>

              <span>
                {study.enrolled} ENROLLED
              </span>

            </div>

          ))}

        </div>

        {formOpen && (
          <div className="study-modal-overlay">

            <form
              className="study-modal"
              onSubmit={handleSubmit}
            >

              <div className="study-modal-header">
                <div>
                  <h2>Add Study</h2>
                  <p>
                    Enter the study, site and subject details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                >
                  x
                </button>
              </div>

              <div className="study-form-grid">

                <label>
                  Study ID
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                    placeholder="Example: ABC-101"
                  />
                </label>

                <label>
                  Study Name
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Study name"
                  />
                </label>

                <label>
                  Protocol
                  <input
                    name="protocol"
                    value={form.protocol}
                    onChange={handleChange}
                    placeholder="Protocol title"
                  />
                </label>

                <label>
                  Site / Hospital
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="Apollo Hospital"
                  />
                </label>

                <label>
                  Subjects Enrolled
                  <input
                    name="enrolled"
                    type="number"
                    min="0"
                    value={form.enrolled}
                    onChange={handleChange}
                    required
                    placeholder="0"
                  />
                </label>

                <label>
                  Target Subjects
                  <input
                    name="targetSubjects"
                    type="number"
                    min="0"
                    value={form.targetSubjects}
                    onChange={handleChange}
                    required
                    placeholder="100"
                  />
                </label>

                <label>
                  Study Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                  >
                    <option>Active</option>
                    <option>Screening</option>
                    <option>Enrollment</option>
                    <option>Paused</option>
                    <option>Completed</option>
                  </select>
                </label>

                <label>
                  Principal Investigator
                  <input
                    name="principalInvestigator"
                    value={form.principalInvestigator}
                    onChange={handleChange}
                    required
                    placeholder="PI name"
                  />
                </label>

                <label>
                  Sponsor
                  <input
                    name="sponsor"
                    value={form.sponsor}
                    onChange={handleChange}
                    required
                    placeholder="Sponsor name"
                  />
                </label>

                <label>
                  Start Date
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="study-form-wide">
                  Study Description
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Brief study description"
                  />
                </label>

              </div>

              <div className="study-modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-study-btn"
                >
                  Submit Study
                </button>
              </div>

            </form>

          </div>
        )}

        {/* {showDeleteModal && studyToDelete && (
          <DeleteConfirmationModal
            onClose={() => {
              setShowDeleteModal(false);
              setStudyToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
            title={`Delete Study: ${studyToDelete.name}`}
            message={`Are you sure you want to delete the study "${studyToDelete.name}" (${studyToDelete.code})? This action cannot be undone.`}
            itemType="study"
          />
        )} */}

      </div>

    </DashboardLayout>

  );
}

export default Studies;
