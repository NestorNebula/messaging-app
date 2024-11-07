import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Searchbar from '../searchbar/Searchbar';
import { addUserToChat } from '../../helpers/addUserToChat';
import styles from './UsersList.module.css';
import PropTypes from 'prop-types';

function UsersList({ onlyFriends, chat, updateState }) {
  const { user } = useContext(MessagingContext);
  const {
    data: users,
    error,
    loading,
  } = useData(onlyFriends ? `users/${user.id}/friends` : 'profiles', {
    method: 'get',
  });
  const [search, setSearch] = useState('');
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const regex = new RegExp(search, 'i');

  return (
    <section id="userslist" className={styles.section}>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName={onlyFriends ? 'friends' : 'users'} />
      ) : (
        <>
          <div className={styles.title}>
            {onlyFriends ? 'Your friends' : 'Popular users'}
          </div>
          <Searchbar value={search} updateValue={updateSearch} />
          <div className={styles.usersList}>
            {onlyFriends
              ? users.friends.friends.map(
                  (person) =>
                    (!chat ||
                      (!chat.users.some((usr) => usr.id === person.id) &&
                        (regex.test(person.username) ||
                          regex.test(person.profile.displayName)))) && (
                      <div key={person.id} className={styles.friend}>
                        <Link
                          to={`profile/${person.id}`}
                          className={styles.link}
                        >
                          <img
                            src={`avatars/${person.profile.avatar}`}
                            alt=""
                          />
                          <div
                            className={`${styles.status} ${
                              person.online ? styles.online : styles.offline
                            }`}
                            aria-label={person.online ? 'online' : 'offline'}
                          ></div>
                        </Link>
                        <div>
                          <div>{person.profile.displayName}</div>
                          <div>(@{person.username})</div>
                        </div>
                        <button
                          onClick={async () => {
                            await addUserToChat(person.id, chat.id);
                            updateState();
                          }}
                          aria-label="add user to chat"
                        >
                          +
                        </button>
                      </div>
                    )
                )
              : users.profiles.map(
                  (person) =>
                    (regex.test(person.user.username) ||
                      regex.test(person.displayName)) && (
                      <div key={person.userId} className={styles.user}>
                        <Link
                          to={`profile/${person.userId}`}
                          className={styles.link}
                        >
                          <img src={`avatars/${person.avatar}`} alt="" />
                        </Link>
                        <div>
                          <div>{person.displayName}</div>
                          <div>(@{person.user.username})</div>
                        </div>
                      </div>
                    )
                )}
          </div>
        </>
      )}
    </section>
  );
}

UsersList.propTypes = {
  onlyFriends: PropTypes.bool,
  chat: PropTypes.object,
  updateState: PropTypes.func,
};

export default UsersList;
