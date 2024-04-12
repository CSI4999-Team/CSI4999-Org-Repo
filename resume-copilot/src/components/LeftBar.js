import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { FaTrash } from 'react-icons/fa';
import "./LeftBar.css";
import { useAuth0 } from "@auth0/auth0-react";

const LeftBar = ({ isOpen, onHistoryItemClick, onDeleteHistoryItem }) => {
    const { user } = useAuth0();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const targetRef = useRef(null);
    const { scrollXProgress } = useScroll({
        target: targetRef,
        axis: "x",
    });

    const handleDelete = async (entryId) => {
      console.log("Attempting to delete entry with ID:", entryId);  // Log the ID being received
  
      if (window.confirm("Are you sure you want to delete this entry?")) {
          try {
              const response = await fetch(`http://localhost:8000/api/delete-data/${entryId}/`, { method: 'DELETE' });
              if (response.ok) {
                  setUserHistory(prevHistory => prevHistory.filter(entry => entry.id !== entryId));
              } else {
                  throw new Error('Failed to delete history entry');
              }
          } catch (error) {
              console.error('Error deleting history entry');
          }
      }
  };  

    const [userHistory, setUserHistory] = useState([]);
    const [hoveredHistoryItem, setHoveredHistoryItem] = useState(null);

    useEffect(() => {
        if (user && user.sub) {
            const fetchUserHistory = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/user-data/${user.sub}/`);
                    if (response.ok) {
                        const historyData = await response.json();
                        setUserHistory(historyData);
                    } else {
                        throw new Error('Failed to fetch user history');
                    }
                } catch (error) {
                    console.error('Error fetching user history');
                }
            };
            fetchUserHistory();
        }
    }, [user]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const x = useTransform(scrollXProgress, [0, 1], ["1%", "-95%"]);

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
                    <li key={index} className="history-item">
                        <button className="ResButtons" onClick={() => onHistoryItemClick(entry)}>
                            {entry.job_description || 'General Feedback'}
                            <FaTrash className="delete-icon" onClick={(e) => {
                                e.stopPropagation(); // Prevent button click event when clicking the icon
                                handleDelete(entry.id);
                            }} />
                        </button>
                    </li>
                ))}
            </ul>            
            ) : (
                <p>No history available or still loading...</p>
            )}
        </motion.div>
    );
};

export default LeftBar;
