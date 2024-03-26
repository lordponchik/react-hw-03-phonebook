import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

function ContactItem({ id, name, number, deleteContact }) {
  return (
    <li key={id} className={s.contactItem}>
      <p className={s.name}>{name}:</p>
      <p className={s.phone}>{number}</p>
      <button
        type="button"
        className={s.deleteBtn}
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
