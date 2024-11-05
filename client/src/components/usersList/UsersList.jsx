import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Searchbar from '../searchbar/Searchbar';
import { addUserToChat } from '../../helpers/addUserToChat';
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
    <section id="userslist">
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName={onlyFriends ? 'friends' : 'users'} />
      ) : (
        <>
          <div>{onlyFriends ? 'Your friends' : 'Popular users'}</div>
          <Searchbar value={search} updateValue={updateSearch} />
          <div>
            {onlyFriends
              ? users.friends.friends.map(
                  (person) =>
                    (!chat ||
                      (!chat.users.some((usr) => usr.id === person.id) &&
                        (regex.test(person.username) ||
                          regex.test(person.profile.displayName)))) && (
                      <div key={person.id}>
                        <Link to={`profile/${person.id}`}>
                          <img
                            src={`avatars/${person.profile.avatar}`}
                            alt=""
                          />
                          <div>
                            {person.profile.online ? 'Online' : 'Offline'}
                          </div>
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
                      <div key={person.userId}>
                        <Link to={`profile/${person.userId}`}>
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
