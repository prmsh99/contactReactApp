import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Header from "./Header";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [contactsDirty, setContactsDirty] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //retrieve the contacts here from axios
  const retrieveContactsFromDB = async () => {
    const getContactsResponse = await api.get("/contacts");
    return getContactsResponse?.data || [];
  };

  const addContactHandler = async (contact) => {
    const request = { id: Math.floor(Math.random() * 1000), ...contact };
    const addContactResponse = await api.post("/contacts", request);
    setContacts([...contacts, addContactResponse.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContactsDirty(true);
    const filteredContactsList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(filteredContactsList);
  };

  const editContactHandler = async (contact) => {
    const editContactResponse = await api.put(
      `/contacts/${contact.id}`,
      contact
    );
    setContacts(
      contacts.map((contact) => {
        return contact.id === editContactResponse.data.id
          ? { ...editContactResponse.data }
          : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }

  };

  useEffect(() => {
    if (contacts?.length || contactsDirty) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
    // eslint-disable-next-line
  }, [contacts]);

  useEffect(() => {
    /*let retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrievedContacts?.length) {
      setContacts(retrievedContacts);
    }*/
    const getAllContacts = async () => {
      const response = await retrieveContactsFromDB();
      if (response) {
        setContacts(response);
      }
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContactHandler={removeContactHandler}
                term={searchTerm}
                searchHandler = {searchHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route
            path="/edit"
            element={<EditContact editContactHandler={editContactHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*
<AddContact addContactHandler={addContactHandler} />
        <ContactList
          contacts={contacts}
          removeContactHandler={removeContactHandler}
        /> 
*/
