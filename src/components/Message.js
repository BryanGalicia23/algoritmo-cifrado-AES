import React from "react";

const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: "3px",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.3rem",
    borderRadius: "1rem",
    backgroundColor: bgColor,
  };

  return (
    <div style={styles}>
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
