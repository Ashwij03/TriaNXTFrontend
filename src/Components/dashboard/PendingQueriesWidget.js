
// newly added

import "./dashboard.css";

function PendingQueriesWidget({
  queries = []
}) {

  return (

    <div className="dashboard-widget">

      <h3>
        Pending Queries
      </h3>

      {
        queries.map(
          (
            query
          ) => (

            <div
              key={query.id}
              className="query-item"
            >

              <strong>
                {query.id}
              </strong>

              <div>
                {
                  query.subject
                }
              </div>

              <small>
                {
                  query.status
                }
              </small>

            </div>

          )
        )
      }

    </div>

  );
}

export default PendingQueriesWidget;