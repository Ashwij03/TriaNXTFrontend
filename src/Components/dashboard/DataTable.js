
//newly added

import React from "react";

import "./DataTable.css";

function DataTable({
  title,
  columns = [],
  data = [],
  emptyMessage = "No records found"
}) {

  return (

    <div className="ctms-table-card">

      <div className="ctms-table-header">

        <h3>{title}</h3>

      </div>

      <div className="ctms-table-wrapper">

        <table className="ctms-table">

          <thead>

            <tr>

              {columns.map((column) => (

                <th key={column.key}>
                  {column.label}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.length > 0 ? (

              data.map((row, index) => (

                <tr key={index}>

                  {columns.map((column) => (

                    <td
                      key={
                        column.key
                      }
                    >
                      {
                        row[
                          column.key
                        ]
                      }
                    </td>

                  ))}

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={
                    columns.length
                  }
                  className="empty-row"
                >

                  {emptyMessage}

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default DataTable;