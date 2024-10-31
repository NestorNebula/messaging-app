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
        ) : (
          chats.sort(sortChats) &&
          chats.map((chat, index) => (
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
                      src={`avatars/${usr.avatar}`}
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
  chats: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  updateActualChat: PropTypes.func.isRequired,
};

export default Sidebar;
