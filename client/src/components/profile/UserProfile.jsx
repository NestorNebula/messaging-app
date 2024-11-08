import { useContext } from 'react';
import { Form, useActionData, useParams, Navigate } from 'react-router-dom';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from './Profile';
import styles from './UserProfile.module.css';

function UserProfile() {
  const { user } = useContext(MessagingContext);
  const { userId } = useParams();
  const result = useActionData();
  const {
    data: profile,
    error,
    loading,
  } = useData(`users/${userId}/profile`, { method: 'get' }, [result]);

  return (
    <main className={styles.main}>
      {profile && user.id === profile.profile.userId && (
        <Navigate to="/account" />
      )}
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading contentName="user profile" />
      ) : (
        <section>
          {result && result.error && <div>{result.error.msg}</div>}
          <Profile profile={profile.profile} />
          <div className={styles.btns}>
            <div>
              {profile.profile.user.followers.some(
                (friend) => friend.id === user.id
              ) ? (
                <Form method="put">
                  <input type="hidden" name="userId" value={user.id} />
                  <input
                    type="hidden"
                    name="friendId"
                    value={profile.profile.userId}
                  />
                  <button name="intent" value="remove-friend">
                    Remove Friend
                  </button>
                </Form>
              ) : (
                <Form method="put">
                  <input type="hidden" name="userId" value={user.id} />
                  <input
                    type="hidden"
                    name="friendId"
                    value={profile.profile.userId}
                  />
                  <button name="intent" value="add-friend">
                    Add Friend
                  </button>
                </Form>
              )}
            </div>
            {!profile.profile.user.chats.some((chat) =>
              chat.users.some(
                (usr) => usr.id === user.id && chat.users.length === 2
              )
            ) && (
              <Form method="post">
                <input type="hidden" name="userId" value={user.id} />
                <input
                  type="hidden"
                  name="friendId"
                  value={profile.profile.userId}
                />
                <button name="intent" value="chat">
                  Send a message
                </button>
              </Form>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default UserProfile;
