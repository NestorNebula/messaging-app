import { useContext } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';

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
        <section>
          <img src={`avatars/${profile.avatar}`} alt="" />
          <div>@{profile.user.username}</div>
          <div>{profile.displayName}</div>
          <div>{profile.bio}</div>
          <div>{profile.link}</div>
        </section>
      )}
    </>
  );
}

export default Account;
