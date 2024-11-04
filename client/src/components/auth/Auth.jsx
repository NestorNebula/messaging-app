import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function Auth() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}

export default Auth;
