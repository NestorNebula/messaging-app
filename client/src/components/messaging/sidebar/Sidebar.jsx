import { checkIdMatch, sortChats } from '../../../helpers/messagingUtils';
import Error from '../../elements/Error';
import Loading from '../../elements/Loading';
import PropTypes from 'prop-types';

function Sidebar({ chats, error, loading, userId }) {
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
          chats.map((chat) => (
            <div key={chat.id}>
              <div>
                {chat.users.map((usr) => {
                  return checkIdMatch(usr.id, userId) ? null : (
                    <img
                      key={`${usr.username}'s avatar`}
                      src={`avatars/${usr.avatar}`}
                      alt={`${usr.username}'s avatar`}
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
            </div>
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
};

export default Sidebar;
