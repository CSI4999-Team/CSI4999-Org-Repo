import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { FaTrash, FaInfoCircle } from 'react-icons/fa';  // Make sure FaInfoCircle is imported here
import "./LeftBar.css";
import { useAuth0 } from "@auth0/auth0-react";

const LeftBar = ({ isOpen, onHistoryItemClick, onDeleteHistoryItem }) => {
    const { user } = useAuth0();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const targetRef = useRef(null);
    const { scrollXProgress } = useScroll({ target: targetRef, axis: "x" });
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleTooltipToggle = () => {
        if (!showTooltip) {
            setTooltipVisible(true);  // Immediately make the tooltip part of the DOM
            setTimeout(() => setShowTooltip(true), 10);  // Slightly delay the visibility to catch the transition
        } else {
            setShowTooltip(false);  // Hide tooltip
            setTimeout(() => setTooltipVisible(false), 250);  // Remove from DOM after transitions
        }
    };

    const handleDelete = async (entryId) => {
        console.log("Attempting to delete entry with ID:", entryId);  // Log the ID being received

        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                const response = await fetch(`https://api.resumecopilot.us/api/delete-data/${entryId}/`, { method: 'DELETE' });
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && user.sub) {
            setIsLoading(true);
            const fetchUserHistory = async () => {
                try {
                    const response = await fetch(`https://api.resumecopilot.us/api/user-data/${user.sub}/`);
                    if (response.ok) {
                        const historyData = await response.json();
                        setUserHistory(historyData);
                    } else {
                        throw new Error('Failed to fetch user history');
                    }
                } catch (error) {
                    console.error('Error fetching user history');
                }
                setIsLoading(false);
            };
            fetchUserHistory();
        }
    }, [user]);

    const x = useTransform(scrollXProgress, [0, 1], ["0%", "-95%"]);
    const tipsAndTricks = [
        { tip: "Always build your experience in reverse chronological order" },
        { tip: "95% of hiring teams prefer one to two pages max" },
        { tip: "Avoid overly technical words, a high school senior should be able to understand your resume" },
    ];

    return (
        <motion.div
            ref={targetRef}
            className={`left-bar ${isOpen || sidebarOpen ? "open" : ""}`}
            style={{ x, backgroundColor: "#282C34", overflowY: 'auto' }} // added overflowY for scrolling
        >
            <h2 className="prevRes">User History</h2>
            {isLoading ? (
                <div>Loading your history...</div>
            ) : userHistory.length > 0 ? (
                <ul>
                    {userHistory.map((entry, index) => (
                        <li key={index} className="history-item">
                            <button className="ResButtons" onClick={() => onHistoryItemClick(entry)}>
                                {entry.job_description ? entry.job_description.split(' ').slice(0, 5).join(' ') + '...' : 'General Feedback'}
                                <FaTrash className="delete-icon" onClick={(e) => {
                                    e.stopPropagation(); // Prevent button click event when clicking the icon
                                    handleDelete(entry.id);
                                }} />
                            </button>
                        </li>
                    ))}
                </ul>            
            ) : (
                <>
                    <h3 className="tiplabel">
                        <button 
                            onClick={handleTooltipToggle}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "inline-flex", alignItems: "center" }}
                        >
                            <FaInfoCircle size={14} style={{ marginRight: "8px" }}/>
                            No history yet!
                        </button>
                    </h3>
                    {tooltipVisible && (
                    <div className={`tooltip ${showTooltip ? "visible" : ""}`}>
                        Your history will automatically load here after you use our site.
                    </div>
                    )}
                    <div className="tips-container">
                        <h4 className="tiplabel">Pro Tips:</h4>
                        <ul className="tnt">
                            {tipsAndTricks.map((tip, index) => (
                                <li key={index}>
                                    <div className="tip">{tip.tip}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default LeftBar;