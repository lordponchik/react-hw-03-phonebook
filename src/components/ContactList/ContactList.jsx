import ContactItem from '../ContactItem/ContactItem';
import s from './ContactList.module.css';

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.contactList}>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          {...contact}
          deleteContact={deleteContact}
        ></ContactItem>
      ))}
    </ul>
  );
}

export default ContactList;
