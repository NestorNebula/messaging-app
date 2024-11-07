import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({
  name,
  value,
  update,
  validation,
  type = 'text',
  label = name,
  required,
}) {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={update}
        value={value}
        required={required !== false}
      />
      <span>{!validation.isValid ? validation.message : null}</span>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
