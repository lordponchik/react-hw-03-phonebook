import s from './Filter.module.css';

function Filter({ filter, handleFilter }) {
  return (
    <div>
      <p>Find contacts by name or phone number</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilter}
        placeholder="Enter name or phone number"
        className={s.input}
      />
    </div>
  );
}

export default Filter;
