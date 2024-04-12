import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./LeftBar.css";
import { useAuth0 } from "@auth0/auth0-react";

const LeftBar = ({ isOpen, onHistoryItemClick }) => {
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
                    const response = await fetch(`http://localhost:8000/api/user-data/${user.sub}/`);
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
                            <button className="ResButtons" onClick={() => onHistoryItemClick(entry)}>
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
};

export default LeftBar;
