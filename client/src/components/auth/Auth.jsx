import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function Auth() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Auth;
