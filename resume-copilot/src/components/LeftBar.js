import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./LeftBar.css";
import { useAuth0 } from "@auth0/auth0-react";

const LeftBar = ({ isOpen }) => {
    const { user } = useAuth0();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const targetRef = useRef(null);
    const { scrollXProgress } = useScroll({
        target: targetRef,
        axis: "x",
    });
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        if (user && user.sub) {
            const fetchUserHistory = async () => {
                try {
                    const response = await fetch(`/api/user-data/${user.sub}/`);
                    if (response.ok) {
                        const historyData = await response.json();
                        setUserHistory(historyData);
                    } else {
                        throw new Error('Failed to fetch user history');
                    }
                } catch (error) {
                    console.error('Error fetching user history:', error);
                }
            };
            fetchUserHistory();
        }
    }, [user]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const x = useTransform(scrollXProgress, [0, 1], ["1%", "-95%"]);

<<<<<<< HEAD
  const oldResumeSuggestions = [
    {
      title: "Resume suggestion 1",
      chatSuggestions: ["Chat suggestion 1", "Chat suggestion 2"],
    },
    {
      title: "Resume suggestion 2",
      chatSuggestions: ["Chat suggestion 3", "Chat suggestion 4"],
    },
    {
      title: "Resume suggestion 3",
      chatSuggestions: ["Chat suggestion 5", "Chat suggestion 6"],
    },
  ];
  const tipsandtricks = [
    {
      tip1: "Always build your experience in reverse chronological order"
    },
    {
      tip2: "95% of hiring teams prefer one to two pages max"
    },
    {
      tip3: "Avoid overly technical words, a highschool senior should be able to understand your resume"
    }
     
  ];

  return (
    <motion.div
      ref={targetRef}
      className={`left-bar ${isOpen || sidebarOpen ? "open" : ""}`}
      style={{ x, backgroundColor: "#282C34" }}
    >
      <h2 className="prevRes">History</h2>
      <ul>
        {oldResumeSuggestions.map((resume, index) => (
          <li key={index}>
            <button>{resume.title}</button>
          </li>
        ))}
      </ul>
      <h3 className="tiplabel">Pro tip</h3>
      <ul className = "tnt">
        {tipsandtricks.map(item => (
          <li key={item.id}>
            <div className="tip">{item.tip1}</div>
            <div className="tip">{item.tip2}</div>
            <div className="tip">{item.tip3}</div>
          </li>

        )
        )} 
      </ul>
      {/* <div
        className="toggle-button"
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          right: isOpen || sidebarOpen ? -20 : -20, // Adjust the value as needed
          zIndex: 999, // Ensure it's on top of the left bar
          cursor: "pointer",
          backgroundColor: "#fff", // Example background color
          padding: "10px",
          borderRadius: "0 5px 5px 0", // Rounded corner on the left side
        }}
      >
        P
      </div> */}
    </motion.div>
  );
=======
    const handleHistoryItemClick = (entry) => {
        console.log('Clicked on history entry:', entry);
    };

    return (
        <motion.div
            ref={targetRef}
            className={`left-bar ${isOpen || sidebarOpen ? "open" : ""}`}
            style={{ x, backgroundColor: "#282C34" }}
        >
            <h2 className="prevRes">User History</h2>
            {userHistory.length > 0 ? (
                <ul>
                    {userHistory.map((entry, index) => (
                        <li key={index}>
                            <button className="ResButtons" onClick={() => handleHistoryItemClick(entry)}>
                                {entry.job_description || 'General Feedback'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history available or still loading...</p>
            )}
        </motion.div>
    );
>>>>>>> main
};

export default LeftBar;
