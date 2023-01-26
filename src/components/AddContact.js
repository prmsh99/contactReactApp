import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  saveContact = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Please fill all the detials");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({
      name: "",
      email: "",
    });
    window.location.pathname = "/";
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.saveContact}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui primary button">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
