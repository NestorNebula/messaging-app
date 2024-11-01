import { useContext } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { useDialog } from '../../hooks/useDialog';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from '../profile/Profile';

function Account() {
  const { user } = useContext(MessagingContext);
  const { data: profile, error, loading } = useData(`users/${user.id}/profile`);
  const { dialogRef, setOpen } = useDialog();
  return (
    <>
      <header>
        <button onClick={() => setOpen(true)} aria-label="settings">
          <img src="" alt="" />
        </button>
      </header>
      <dialog onCancel={() => setOpen(false)} ref={dialogRef}>
        <button>Update Private Informations</button>
        <button>Update Profile</button>
      </dialog>
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
