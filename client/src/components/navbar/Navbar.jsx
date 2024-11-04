import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ user }) {
  return (
    <nav>
      <ul>
        <li>{user ? <Link to="/">Home</Link> : 'Messaging App'}</li>
        <li>
          {user ? (
            <Link to="/account">Account</Link>
          ) : (
            'Log In to start sending messages'
          )}
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
