import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EditContact = (props) => {
  const location = useLocation();
  let { id, name, email } = location.state.contact;
  const [state, setState] = useState({
    id,
    name,
    email,
  });

  const update = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("Please fill all the detials");
      return;
    }
    props.editContactHandler(state);
    setTimeout(() => {
      window.location.pathname = "/";
    }, 500);
  };

  const updateStateValues = (e, type) => {
    e.preventDefault();
    if (type == "name") {
      setState({
        ...state,
        name: e.target.value,
      });
    } else {
      setState({
        ...state,
        email: e.target.value,
      });
    }
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={state.name || ""}
            onChange={(e) => updateStateValues(e, "name")}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            value={state.email || ""}
            onChange={(e) => updateStateValues(e, "email")}
          />
        </div>
        <button className="ui primary button">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
