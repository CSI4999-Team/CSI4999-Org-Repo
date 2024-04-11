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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && user.sub) {
            setIsLoading(true);
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
                setIsLoading(false);
            };
            fetchUserHistory();
        }
    }, [user]);

    const handleHistoryItemClick = (entry) => {
        console.log('Clicked on history entry:', entry);
    };

    const x = useTransform(scrollXProgress, [0, 1], ["1%", "-95%"]);

    const tipsAndTricks = [
        { tip: "Always build your experience in reverse chronological order" },
        { tip: "95% of hiring teams prefer one to two pages max" },
        { tip: "Avoid overly technical words, a high school senior should be able to understand your resume" },
    ];

    return (
        <motion.div
            ref={targetRef}
            className={`left-bar ${isOpen || sidebarOpen ? "open" : ""}`}
            style={{ x, backgroundColor: "#282C34" }}
        >
            {(!isLoading && userHistory.length > 0) ? (
                <>
                    <h2 className="prevRes">User History</h2>
                    <ul>
                        {userHistory.map((entry, index) => (
                            <li key={index}>
                                <button className="ResButtons" onClick={() => handleHistoryItemClick(entry)}>
                                    {entry.job_description || 'General Feedback'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <h3 className="tiplabel">Pro tip</h3>
                    <ul className="tnt">
                        {tipsAndTricks.map((tip, index) => (
                            <li key={index}>
                                <div className="tip">{tip.tip}</div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </motion.div>
    );
};

export default LeftBar;
