import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/App_Context";

// Navbar component displays navigation links based on authentication state
const Navbar = () => {
  // Destructure values from context
  const { isAuthenticated, setisAuthenticated, logOut } = useContext(AppContext);

  return (
    <>
      {/* Main navbar container */}
      <div className="nav bg-dark p-2">
        {/* Brand or logo link */}
        <Link
          to={"/"}
          className="left"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h2>MERN Recipe</h2>
        </Link>

        {/* Navigation links on the right side */}
        <div className="right">
          {/* Show these links only if user is authenticated */}
          {isAuthenticated && (
            <>
              {/* Add Recipe Page */}
              <Link to={"/add"} clsssName="btn btn-info mx-2">
                Add
              </Link>
              {/* User Profile Page */}
              <Link to={"/profile"} className="btn btn-warning mx-2">
                Profile
              </Link>
              {/* Logout action */}
              <div className="btn btn-danger mx-2" onClick={logOut}>
                LogOut
              </div>
            </>
          )}

          {/* If user is not authenticated, show Login and Register links */}
          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="btn btn-primary mx-2">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-warning mx-2">
                Register
              </Link>
            </>
          )}

          {/* Saved recipes is always shown */}
          <Link to={"/saved"} className="btn btn-light mx-2">
            Saved
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
