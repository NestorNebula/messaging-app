import { useContext, useState } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { sortMessages } from '../../helpers/messagingUtils';
import Sidebar from './sidebar/Sidebar';
import Message from './message/Message';
import MessageForm from './message/MessageForm';
import UsersList from '../usersList/UsersList';

function Messaging() {
  const { user } = useContext(MessagingContext);
  const {
    data: chats,
    error,
    loading,
  } = useData(`users/${user.id}/chats`, { method: 'get' }, []);
  const [actualChat, setActualChat] = useState(0);
  const [displayFriends, setDisplayFriends] = useState(false);
  const updateActualChat = (id) => {
    setActualChat(id);
  };
  return (
    <main>
      <header>
        <img src="" alt="messages page" />
      </header>
      <Sidebar
        chats={chats}
        error={error}
        loading={loading}
        userId={user.id}
        updateActualChat={updateActualChat}
      />
      <section>
        {chats && chats.length ? (
          <>
            <div>
              <h5>
                {chats[actualChat].users.map((usr) => (
                  <span key={`${usr.username}title`}>{usr.username}</span>
                ))}
              </h5>
              <button
                onClick={() => setDisplayFriends(true)}
                aria-label="add someone to chat"
              >
                +
              </button>
            </div>
            <div>
              {chats[actualChat].messages.sort(sortMessages) &&
                chats[actualChat].messages.map((message) => (
                  <Message
                    key={`${message.id}content`}
                    message={message}
                    author={chats[actualChat].users.find(
                      (usr) => usr.id === message.userId
                    )}
                    user={user}
                  />
                ))}
            </div>
            <MessageForm chat={chats[actualChat]} />
          </>
        ) : (
          <div>No messages to display.</div>
        )}
        {displayFriends && (
          <UsersList onlyFriends={true} chat={chats[actualChat]} />
        )}
      </section>
    </main>
  );
}

export default Messaging;
