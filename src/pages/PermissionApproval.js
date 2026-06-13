function PermissionApproval() {

  const users =
    JSON.parse(
      localStorage.getItem(
        "users"
      )
    ) || [];

  const approve =
    userId => {

      const updated =
        users.map(user => {

          if (
            user.id ===
            userId
          ) {

            return {

              ...user,

              approvalStatus:
                "Approved",

              permissions:
                user.requestedPermissions
            };
          }

          return user;
        });

      localStorage.setItem(
        "users",
        JSON.stringify(
          updated
        )
      );

      window.location.reload();
    };

  return (
    <div>

      <h2>
        Permission Approval
      </h2>

      {
        users
          .filter(
            user =>
              user.approvalStatus ===
              "Pending"
          )
          .map(user => (

            <div
              key={
                user.id
              }
            >
              <h4>
                {user.name}
              </h4>

              <button
                onClick={() =>
                  approve(
                    user.id
                  )
                }
              >
                Approve
              </button>

            </div>
          ))
      }

    </div>
  );
}

export default PermissionApproval;