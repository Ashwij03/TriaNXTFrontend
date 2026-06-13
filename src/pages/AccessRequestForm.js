import { useState } from "react";

function AccessRequestForm() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const [selected,
    setSelected] =
    useState([]);

  const permissions = [

    "study.view",

    "study.edit",

    "subject.view",

    "subject.edit",

    "visit.view",

    "visit.edit",

    "report.view",

    "query.view"
  ];

  const togglePermission =
    permission => {

      if (
        selected.includes(
          permission
        )
      ) {

        setSelected(
          selected.filter(
            p =>
              p !==
              permission
          )
        );

      } else {

        setSelected([
          ...selected,
          permission
        ]);
      }
    };

  const submit =
    () => {

      let users =
        JSON.parse(
          localStorage.getItem(
            "users"
          )
        ) || [];

      users = users.map(
        u =>
          u.id === user.id
            ? {
                ...u,
                requestedPermissions:
                  selected
              }
            : u
      );

      localStorage.setItem(
        "users",
        JSON.stringify(
          users
        )
      );

      alert(
        "Request Submitted"
      );
    };

  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h2>
        Access Request Form
      </h2>

      {
        permissions.map(
          permission => (
            <div
              key={
                permission
              }
            >
              <input
                type="checkbox"
                onChange={() =>
                  togglePermission(
                    permission
                  )
                }
              />

              {permission}
            </div>
          )
        )
      }

      <button
        onClick={submit}
      >
        Submit
      </button>

    </div>
  );
}

export default AccessRequestForm;