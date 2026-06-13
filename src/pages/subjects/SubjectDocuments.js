// newly added

function SubjectDocuments() {

  const docs = [
    "Informed Consent",
    "Lab Report",
    "Medical History"
  ];

  return (

    <div className="subject-tab-card">

      <ul>

        {docs.map(doc => (

          <li key={doc}>
            {doc}
          </li>

        ))}

      </ul>

    </div>

  );
}

export default SubjectDocuments;