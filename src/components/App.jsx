import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

const CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem(CONTACTS);

    if (localData)
      this.setState({
        contacts: JSON.parse(localData),
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
    }
  }
  handleFilter = evt => {
    const { value } = evt.target;

    this.setState({
      filter: value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevEvent => ({
      contacts: prevEvent.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  addContact = data => {
    const { contacts } = this.state;

    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(({ name }) => name === contact.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    this.setState(prevEvent => ({
      contacts: [contact, ...prevEvent.contacts],
    }));
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name, number }) => {
      return (
        number.split('-').join('').includes(this.state.filter) ||
        number.includes(this.state.filter) ||
        name.toLowerCase().includes(normalizedFilter)
      );
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>

        {visibleContacts.length > 0 ? (
          <>
            <Filter
              filter={this.state.filter}
              handleFilter={this.handleFilter}
            ></Filter>
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            ></ContactList>
          </>
        ) : (
          <Notification message="You don't have any contact"></Notification>
        )}
      </div>
    );
  }
}
