import PropTypes from 'prop-types';

function Searchbar({ value, updateValue, label = 'search' }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="text"
        value={value}
        onChange={updateValue}
        placeholder={label}
      />
    </>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default Searchbar;
