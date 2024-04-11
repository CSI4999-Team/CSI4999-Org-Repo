import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function UserProfile() {
    const { user, isAuthenticated } = useAuth0();

    return isAuthenticated ? (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Token: {user.sub}</p>
            <p>Other: {user.locale}</p>
        </div>
    ) : null;
}

export default UserProfile;
