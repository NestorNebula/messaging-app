import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function Navbar({ user }) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {user ? (
            <Link to="/">
              <img src="icons/chat.svg" alt="chats" className={styles.icon} />
            </Link>
          ) : (
            'Messaging App'
          )}
        </li>
        <li>
          {user ? (
            <Link to="/account">
              <img
                src="icons/account.svg"
                alt="account"
                className={styles.icon}
              />
            </Link>
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
