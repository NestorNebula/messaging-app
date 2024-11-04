import { Outlet, useLoaderData } from 'react-router-dom';
import { MessagingContext } from './context/MessagingContext';
import { useStatus } from './hooks/useStatus';
import Navbar from './components/navbar/Navbar';
import './App.css';

function App() {
  const { user } = useLoaderData();
  useStatus(user.id);
  return (
    <MessagingContext.Provider value={{ user }}>
      <Outlet />
      <Navbar user={user} />
    </MessagingContext.Provider>
  );
}

export default App;
