import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const inputEle = useRef("");
  const handleDeleteHandler = (id) => {
    props.removeContactHandler(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        handleDeleteHandler={handleDeleteHandler}
        key={contact.id}
      />
    );
  });

  const handleSearch = (e) => {
    props.searchHandler(inputEle.current.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right addContactBtn">
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input width30vw">
          <input
            ref={inputEle}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={handleSearch}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
