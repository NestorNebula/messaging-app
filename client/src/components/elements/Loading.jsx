import PropTypes from 'prop-types';
import styles from './Loading.module.css';

function Loading({ contentName }) {
  return <div className={styles.loading}>Loading {contentName}...</div>;
}

Loading.propTypes = {
  contentName: PropTypes.string.isRequired,
};

export default Loading;
