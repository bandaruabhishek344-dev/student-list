import React, {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import "../styles/UserDashboard.css";

function UserDashboard() {

  const {
    user,
  } = useContext(AuthContext);

  return (

    <div className="user-dashboard">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>
          My Profile
        </h1>

        <div className="profile-info">

          <p>

            <strong>
              Email:
            </strong>

            {" "}

            {user?.email}

          </p>

          <p>

            <strong>
              Role:
            </strong>

            {" "}

            {user?.role}

          </p>

          <p>

            <strong>
              Status:
            </strong>

            {" "}

            Active

          </p>

        </div>

      </div>

    </div>

  );

}

export default UserDashboard;