import PropTypes from 'prop-types';
import styles from './Error.module.css';

function Error({ error }) {
  return <div className={styles.error}>{error}</div>;
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
