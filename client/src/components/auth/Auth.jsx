import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Auth() {
  return (
    <>
      <Navbar />
      <main
        style={{
          height: '80vh',
          display: 'grid',
          placeContent: 'center',
          marginTop: '5vh',
          overflow: 'scroll',
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Auth;
