import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return <div></div>;
};

export default ThoughtList;
