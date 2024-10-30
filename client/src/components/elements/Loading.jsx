import PropTypes from 'prop-types';

function Loading({ contentName }) {
  return <div>Loading {contentName}...</div>;
}

Loading.propTypes = {
  contentName: PropTypes.string.isRequired,
};

export default Loading;
