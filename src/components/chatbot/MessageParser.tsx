import React from "react";
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log("inside message parser");
    actions.callGaianetAPI(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
