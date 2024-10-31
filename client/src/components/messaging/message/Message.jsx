import PropTypes from 'prop-types';

function Message({ message, author, user }) {
  const userIsAuthor = author.id === user.id;
  return (
    <div>
      <button
        aria-label={
          userIsAuthor
            ? 'open your profile'
            : `open ${author.profile.displayName} profile`
        }
      >
        <img src={`avatars/${author.profile.avatar}`} alt="" />
      </button>
      <div>
        {message.content && <div>{message.content}</div>}
        {message.file && <img src={message.file} />}
      </div>
      <div>{Date(message.creationDate)}</div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
