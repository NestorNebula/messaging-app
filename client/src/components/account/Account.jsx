import { useContext } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from '../profile/Profile';

function Account() {
  const { user } = useContext(MessagingContext);
  const { data: profile, error, loading } = useData(`users/${user.id}/profile`);
  return (
    <>
      <header>
        <button aria-label="settings">
          <img src="" alt="" />
        </button>
      </header>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName="account" />
      ) : (
        <Profile profile={profile} />
      )}
    </>
  );
}

export default Account;
