import { Outlet, useLoaderData } from 'react-router-dom';
import { MessagingContext } from './context/MessagingContext';
import './App.css';

function App() {
  const { user } = useLoaderData();
  return (
    <MessagingContext.Provider value={{ user }}>
      <Outlet />
    </MessagingContext.Provider>
  );
}

export default App;
