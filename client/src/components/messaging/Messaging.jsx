import { useContext, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { useDialog } from '../../hooks/useDialog';
import { sortMessages } from '../../helpers/messagingUtils';
import Sidebar from './sidebar/Sidebar';
import Message from './message/Message';
import MessageForm from './message/MessageForm';
import UsersList from '../usersList/UsersList';

function Messaging() {
  const result = useActionData();
  const [lastResult, setLastResult] = useState(result);
  const { user } = useContext(MessagingContext);
  const [update, setUpdate] = useState(false);
  const updateState = () => {
    setUpdate(!update);
  };
  if (result) {
    if (result !== lastResult) {
      setLastResult(result);
      if (result.success) updateState();
    }
  }
  const {
    data: chats,
    error,
    loading,
  } = useData(`users/${user.id}/chats`, { method: 'get' }, [update]);
  const [actualChat, setActualChat] = useState(0);
  const {
    dialogRef: searchRef,
    setOpen: setSearch,
    open: search,
  } = useDialog();
  const {
    dialogRef: friendsRef,
    setOpen: setFriends,
    open: friends,
  } = useDialog();
  const updateActualChat = (id) => {
    setActualChat(id);
  };

  return (
    <main>
      <dialog ref={friendsRef} onCancel={() => setFriends(false)}>
        {friends && (
          <>
            <button
              onClick={() => setFriends(false)}
              aria-label="close friends menu"
            >
              X
            </button>
            <UsersList
              onlyFriends={true}
              chat={chats.chats[actualChat]}
              updateState={updateState}
            />
          </>
        )}
      </dialog>
      <dialog ref={searchRef} onCancel={() => setSearch(false)}>
        {search && (
          <>
            <button onClick={() => setSearch(false)} aria-label="close search">
              X
            </button>
            <UsersList />
          </>
        )}
      </dialog>
      <header>
        <img src="" alt="messages page" />
        <button onClick={() => setSearch(true)} aria-label="search users">
          <img src="" alt="" />
        </button>
      </header>
      <Sidebar
        chats={chats}
        error={error}
        loading={loading}
        userId={user.id}
        updateActualChat={updateActualChat}
      />
      <section>
        {chats && chats.chats && chats.chats.length ? (
          <>
            <div>
              <h5>
                {chats.chats[actualChat].users.map((usr) => (
                  <span key={`${usr.username}title`}>{usr.username}</span>
                ))}
              </h5>
              <button
                onClick={() => setFriends(true)}
                aria-label="add someone to chat"
              >
                +
              </button>
            </div>
            <div>
              {chats.chats[actualChat].messages.sort(sortMessages) &&
                chats.chats[actualChat].messages.map((message) => (
                  <Message
                    key={`${message.id}content`}
                    message={message}
                    author={chats.chats[actualChat].users.find(
                      (usr) => usr.id === message.userId
                    )}
                    user={user}
                  />
                ))}
            </div>
            <MessageForm chat={chats.chats[actualChat]} />
          </>
        ) : (
          <div>No messages to display.</div>
        )}
      </section>
    </main>
  );
}

export default Messaging;
