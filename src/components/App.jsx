import { Component } from "react";
import { Form } from "./Form/Form";
import { nanoid } from "nanoid";
import { ContactsList } from 'components/Contacts/ContactsList'
import { Filter } from "./Filter/Filter";

export class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
    filter: ''
  }

  componentDidMount(){
    let savedContacts = localStorage.getItem('contacts')
    if (savedContacts !== null) {
      let parsedContacts = JSON.parse(savedContacts)
      this.setState({ contacts: parsedContacts })
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }
  
  addContact = ({name, number}) => {
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, {id: nanoid(), name, number}]}
    })
  
  }

  handleFilter = ev => {
    const { value } = ev.target;
    this.setState({ filter: value });
  };

  showFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };
  
  OnClickDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <Form addContact={this.addContact} contacts={this.state.contacts}></Form>

        <h2>Contacts</h2>
        <Filter
          handleFilter={this.handleFilter}
          filter={this.state.filter}
        />
        <ContactsList
          showFilteredContacts={this.showFilteredContacts()}
          OnClickDelete={this.OnClickDelete}
        />
    </>
    )
    
  }
} 
