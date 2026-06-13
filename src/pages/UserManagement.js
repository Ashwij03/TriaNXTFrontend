import Navbar from "../Navbar";

function UserManagement() {

  const users =
    JSON.parse(
      localStorage.getItem(
        "users"
      )
    ) || [];

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  return (
    <div>

      <Navbar
        name={
          currentUser?.name
        }
      />

      <div
        style={{
          padding: "20px"
        }}
      >

        <h1>
          User Management
        </h1>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {users.map(user => (

              <tr
                key={user.id}
              >
                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  {
                    user.approvalStatus
                  }
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserManagement;