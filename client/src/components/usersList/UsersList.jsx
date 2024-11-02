import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import PropTypes from 'prop-types';

function UsersList({ onlyFriends }) {
  const { user } = useContext(MessagingContext);
  const {
    data: users,
    error,
    loading,
  } = useData(onlyFriends ? `users/${user.id}/friends` : 'profiles', {
    method: 'get',
  });

  return (
    <section>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName={onlyFriends ? 'friends' : 'users'} />
      ) : (
        <>
          <div>{onlyFriends ? 'Your friends' : 'Popular users'}</div>
          <div>
            {users.map((person) =>
              onlyFriends ? (
                <div key={person.id}>
                  <Link to={`profile/${person.id}`}>
                    <img src={`avatars/${person.profile.avatar}`} alt="" />
                  </Link>
                  <div>
                    <div>{person.profile.displayName}</div>
                    <div>(@{person.username})</div>
                  </div>
                </div>
              ) : (
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
};

export default UsersList;
