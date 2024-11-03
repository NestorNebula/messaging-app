import { checkIdMatch, sortChats } from '../../../helpers/messagingUtils';
import Error from '../../elements/Error';
import Loading from '../../elements/Loading';
import PropTypes from 'prop-types';

function Sidebar({ chats, error, loading, userId, updateActualChat }) {
  return (
    <aside>
      <div>Messages</div>
      <div>
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
            >
              <div>
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
              <div>
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
  updateActualChat: PropTypes.func.isRequired,
};

export default Sidebar;
