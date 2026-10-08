import React, {
  useMemo,
  useState,
} from "react";

import Modal from "../components/Modal";

function Users() {

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

  const users = useMemo(() => [

    {
      id: 1,
      email: "admin@gmail.com",
      role: "admin",
      status: "Active",
    },

    {
      id: 2,
      email: "user@gmail.com",
      role: "user",
      status: "Active",
    },

  ], []);

  return (

    <div className="users-page">

      <h1>
        👥 All Users
      </h1>

      <div className="users-table-wrapper">

        <table className="users-table">

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (item) => (

                <tr key={item.id}>

                  <td>
                    {item.id}
                  </td>

                  <td>
                    {item.email}
                  </td>

                  <td>
                    {item.role}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        setSelectedUser(
                          item
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      <Modal
        isOpen={
          Boolean(selectedUser)
        }
        onClose={() =>
          setSelectedUser(null)
        }
        title="User Details"
      >

        {selectedUser && (

          <div>

            <p>
              <strong>
                ID:
              </strong>{" "}
              {selectedUser.id}
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {selectedUser.email}
            </p>

            <p>
              <strong>
                Role:
              </strong>{" "}
              {selectedUser.role}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {selectedUser.status}
            </p>

          </div>

        )}

      </Modal>

    </div>

  );

}

export default Users;