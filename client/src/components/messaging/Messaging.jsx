import { useContext, useState } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { sortMessages } from '../../helpers/messagingUtils';
import Sidebar from './sidebar/Sidebar';

function Messaging() {
  const { user } = useContext(MessagingContext);
  const {
    data: chats,
    error,
    loading,
  } = useData(`users/${user.id}/chats`, { method: 'get' }, []);
  const [actualChat, setActualChat] = useState(0);
  const updateActualChat = (newActualChat) => {
    setActualChat(newActualChat.id);
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
        {chats ? (
          <>
            <h5>
              {chats[actualChat].users.map((usr) => (
                <span key={`${usr.username}title`}>{usr.username}</span>
              ))}
            </h5>
            <div>
              {chats[actualChat].messages.sort(sortMessages) &&
                chats[actualChat].messages.map((message) => (
                  <div key={`${message.id}content`}>
                    <div>{message.content}</div>
                    <div>{Date(message.creationDate)}</div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div>No messages to display.</div>
        )}
      </section>
    </main>
  );
}

export default Messaging;
