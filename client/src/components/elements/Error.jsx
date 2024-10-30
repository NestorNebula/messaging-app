import PropTypes from 'prop-types';

function Error({ error }) {
  return <div>{error}</div>;
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
