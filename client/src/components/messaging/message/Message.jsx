import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Message({ message, author, user }) {
  const userIsAuthor = author.id === user.id;
  return (
    <div>
      <Link
        to={userIsAuthor ? `account` : `profile/${author.id}`}
        aria-label={
          userIsAuthor
            ? 'open your profile'
            : `open ${author.profile.displayName} profile`
        }
      >
        <img src={`avatars/${author.profile.avatar}`} alt="" />
      </Link>
      <div>
        {message.content && <div>{message.content}</div>}
        {message.file && <img src={message.file} />}
      </div>
      <div>{message.creationDate.toString()}</div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
