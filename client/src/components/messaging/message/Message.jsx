import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  differenceInCalendarDays,
  format,
  intlFormat,
  isToday,
} from 'date-fns';
import styles from './Message.module.css';

function Message({ message, author, user }) {
  const userIsAuthor = author.id === user.id;
  const messageDate = new Date(message.creationDate);
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
        {isToday(messageDate)
          ? format(messageDate, 'HH:mm')
          : differenceInCalendarDays(messageDate, new Date(Date.now())) < 7
          ? format(messageDate, 'HH:mm (dd/MM/yyyy)')
          : intlFormat(messageDate)}
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
