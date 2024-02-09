import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion"; //frame motion allows for scroll and transfromation

const LeftBar = ({ isOpen }) => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
    axis: "x",
  });

  // The scrolling aspect... hopefully it works
  const x = useTransform(scrollXProgress, [0, 1], ["1%", "-95%"]);

  // The previous suggestions I am going to have it be stored here... not sure how that is going to work yet
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
    // motion.div is what allows for the div itself to span open!
    <motion.div
      ref={targetRef} //not exactly sure how this works, "a reference to the component's element, used for scroll tracking and animations."
      className={`left-bar ${isOpen ? "open" : ""}`}
      style={{ x }}
    >
      <h2>Previous Resume Suggestions</h2>
      <ul>
        {oldResumeSuggestions.map((resume, index) => (
          <li key={index}>
            {/* make the resume title clickable to open old output */}
            <button>{resume.title}</button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default LeftBar;
