import React from "react";

const About = (props) => {
  return (
    <div>
      <h1>{props.match.params.name}</h1>
      <h1 className="display-4">About Contact Manager</h1>
      <p className="lead">Simple app to manage contacts</p>
      <p className="text-secondary">version 2.0.0</p>
    </div>
  );
};

export default About;
