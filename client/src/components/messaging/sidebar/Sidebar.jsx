import { checkIdMatch, sortChats } from '../../../helpers/messagingUtils';
import Error from '../../elements/Error';
import Loading from '../../elements/Loading';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

function Sidebar({
  chats,
  error,
  loading,
  userId,
  actualChat,
  updateActualChat,
}) {
  return (
    <aside className={styles.sidebar}>
      <div>Messages</div>
      <div className={styles.chats}>
        {error ? (
          <Error error={error} />
        ) : loading ? (
          <Loading contentName="messages" />
        ) : !chats.chats || !chats.chats.length ? (
          <div>No chats to display.</div>
        ) : (
          chats.chats.sort(sortChats) &&
          chats.chats.map((chat, index) => (
            <button
              aria-label={`open chat with ${chat.users.map(
                (usr) => !checkIdMatch(usr) && `${usr.username} `
              )}`}
              onClick={() => updateActualChat(index)}
              key={chat.id}
              className={`${styles.chat} ${
                index === actualChat && styles.actualChat
              }`}
            >
              <div className={styles.chatAvatars}>
                {chat.users.map((usr) => {
                  return checkIdMatch(usr.id, userId) ? null : (
                    <img
                      key={`${usr.username}'s avatar`}
                      src={`avatars/${usr.profile.avatar}`}
                      alt=""
                    />
                  );
                })}
              </div>
              <div className={styles.chatUsernames}>
                {chat.users.map((usr) => {
                  return checkIdMatch(usr.id, userId) ? null : (
                    <span key={`${usr.username}name`}>
                      {usr.profile.displayName}
                    </span>
                  );
                })}
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  chats: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  actualChat: PropTypes.number.isRequired,
  updateActualChat: PropTypes.func.isRequired,
};

export default Sidebar;
