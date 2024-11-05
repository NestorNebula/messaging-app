import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Message.module.css';

function Message({ message, author, user }) {
  const userIsAuthor = author.id === user.id;
  const messageDate = new Date(message.creationDate);
  const setYesterday = () => {
    const actual = new Date(Date.now());
    actual.setDate(actual.getDate() - 1);
    return actual;
  };
  const yesterday = setYesterday();
  const sentToday = messageDate > yesterday ? true : false;
  return (
    <div
      className={`${styles.message} ${
        userIsAuthor ? styles.ownmessage : styles.othermessage
      }`}
    >
      <Link
        to={userIsAuthor ? `account` : `profile/${author.id}`}
        aria-label={
          userIsAuthor
            ? 'open your profile'
            : `open ${author.profile.displayName} profile`
        }
      >
        <img
          src={`avatars/${author.profile.avatar}`}
          alt=""
          className={styles.avatar}
        />
      </Link>
      <div className={styles.content}>
        {message.content && <div>{message.content}</div>}
        {message.file && <img src={message.file} />}
      </div>
      <div className={styles.date}>
        {sentToday
          ? messageDate.toLocaleDateString()
          : messageDate.toLocaleString()}
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
