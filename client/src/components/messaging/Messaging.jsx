import { useContext } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Sidebar from './sidebar/Sidebar';

function Messaging() {
  const { user } = useContext(MessagingContext);
  const {
    data: chats,
    error,
    loading,
  } = useData(`users/${user.id}/chats`, { method: 'get' }, []);

  return (
    <main>
      <header>
        <img src="" alt="messages page" />
      </header>
      <Sidebar chats={chats} error={error} loading={loading} userId={user.id} />
    </main>
  );
}

export default Messaging;
