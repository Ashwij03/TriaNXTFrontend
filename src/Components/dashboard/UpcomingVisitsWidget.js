
// newly added

import "./dashboard.css";

function UpcomingVisitsWidget({
  visits = []
}) {

  return (

    <div className="dashboard-widget">

      <h3>
        Upcoming Visits
      </h3>

      {
        visits.map(
          (
            visit,
            index
          ) => (

            <div
              key={index}
              className="visit-item"
            >

              <strong>
                {
                  visit.subject
                }
              </strong>

              <div>
                {
                  visit.visit
                }
              </div>

              <small>
                {
                  visit.date
                }
              </small>

            </div>

          )
        )
      }

    </div>

  );
}

export default UpcomingVisitsWidget;