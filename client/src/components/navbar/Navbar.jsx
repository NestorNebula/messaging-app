import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import chat from '../../assets/icons/chat.svg';
import account from '../../assets/icons/account.svg';

import styles from './Navbar.module.css';
function Navbar({ user }) {
  return (
    <nav className={`${styles.nav} ${!user ? styles.auth : ''}`}>
      <ul>
        <li>
          {user ? (
            <Link to="/">
              <img src={chat} alt="chats" className={styles.icon} />
            </Link>
          ) : (
            'Messaging App'
          )}
        </li>
        <li>
          {user ? (
            <Link to="/account">
              <img src={account} alt="account" className={styles.icon} />
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
