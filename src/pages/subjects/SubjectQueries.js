// newly added

function SubjectQueries() {

  const queries = [

    {
      id:"Q-101",
      status:"Open"
    },

    {
      id:"Q-102",
      status:"Resolved"
    }

  ];

  return (

    <div className="subject-tab-card">

      <table>

        <thead>

          <tr>

            <th>Query ID</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {queries.map(q => (

            <tr key={q.id}>

              <td>{q.id}</td>
              <td>{q.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default SubjectQueries;