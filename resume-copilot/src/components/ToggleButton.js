import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ToggleButton = ({ sidebarOpen, toggleSidebar, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the routes where you want to show the toggle button
  const showToggleOnRoutes = ['/'];

  // Check if the current route is in the showToggleOnRoutes array
  const showToggleButton = showToggleOnRoutes.includes(location.pathname);

  useEffect(() => {
    // Close the sidebar when navigating to a sub-route
    if (!showToggleOnRoutes.includes(location.pathname)) {
      setSidebarOpen(false);
    }
  }, [location.pathname, showToggleOnRoutes, setSidebarOpen]);

  return (
    <>
      {showToggleButton && (
        <div className="toggle-button" onClick={toggleSidebar}>
          <img
            src="./arrow-right.svg"
            alt="An arrow"
            style={{ transform: sidebarOpen ? 'scaleX(-1)' : 'scaleX(1)' }}
          />
        </div>
      )}
    </>
  );
};

export default ToggleButton;