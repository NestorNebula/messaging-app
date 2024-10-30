import { useContext } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';

function Messaging() {
  const { user } = useContext(MessagingContext);
  const {
    data: chats,
    error,
    loading,
  } = useData(`users/${user.id}/chats`, { method: 'get' }, []);
  const sortChats = (a, b) => {
    a.updatedAt >= b.updatedAt ? -1 : 1;
  };

  const checkIdMatch = (id) => id === user.id;
  return (
    <main>
      <header>
        <img src="" alt="messages page" />
      </header>
      <section>
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
                    return checkIdMatch(usr.id) ? null : (
                      <img
                        src={`avatars/${usr.avatar}`}
                        alt={`${usr.username}'s avatar`}
                      />
                    );
                  })}
                </div>
                <div>
                  {chat.users.map((usr) => {
                    return checkIdMatch(usr.id) ? null : (
                      <span>{usr.profile.displayName}</span>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Messaging;
