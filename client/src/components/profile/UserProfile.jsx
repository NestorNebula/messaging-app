import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from './Profile';

function UserProfile() {
  const { user } = useContext(MessagingContext);
  const { userId } = useParams();
  const {
    data: profile,
    error,
    loading,
  } = useData(`users/${userId}/profile`, { method: 'get' });

  return (
    <section>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName="user profile" />
      ) : (
        <>
          <Profile profile={profile} />
        </>
      )}
    </section>
  );
}

export default UserProfile;
