import css from './Form.module.css'
import { Component } from 'react'
import { Notify } from 'notiflix'


export class Form extends Component {
state = {
    name: "",
    number: ""
}
    
    
handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value})     
}

handleSubmit = (ev) => {
    ev.preventDefault();
    const name = this.state.name;
    const number = this.state.number;
    if (
        this.props.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()
        )
    ) {
        return Notify.warning('This contact is already in the list');
    }

    this.props.addContact({ name, number });
    this.setState({name: '', number: ''});
}

    render() {
        return (<>
            <form className={css.Form} onSubmit={this.handleSubmit}>
                <label className={css.label}>
                    Name
                    <input className={css.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required />
                </label>
                <label className={css.label}>
                    Number
                    <input className={css.input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        value={this.state.number}
                        onChange={this.handleChange}
                        required/>
                </label>
                <button type="submit" className={css.button}>Add contact</button>
            </form>
        </>
        )
    }
}