import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';

import s from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  submitForm = evt => {
    evt.preventDefault();

    this.props.onSubmit({ ...this.state });

    this.resetForm();
  };

  handleChange = evt => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.submitForm} className={s.form}>
        <div className={s.inputsWrapper}>
          <label htmlFor={this.nameInputId} className={s.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id={this.nameInputId}
            className={s.input}
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={s.inputsWrapper}>
          <label htmlFor={this.numberInputId} className={s.label}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            id={this.numberInputId}
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="Enter phone number"
            className={s.input}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" className={s.submit}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
