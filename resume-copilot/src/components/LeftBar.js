import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./LeftBar.css";

const LeftBar = ({ isOpen }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const targetRef = useRef(null);

  const { scrollXProgress } = useScroll({
    target: targetRef,
    axis: "x",
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const x = useTransform(scrollXProgress, [0, 1], ["1%", "-95%"]);

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
            <button className="ResButtons">{resume.title}</button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default LeftBar;
