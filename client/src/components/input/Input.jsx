import PropTypes from 'prop-types';

function Input({
  name,
  value,
  update,
  validation,
  type = 'text',
  label = name,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={update}
        value={value}
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
};

export default Input;
