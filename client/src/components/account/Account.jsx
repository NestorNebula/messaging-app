import { useContext, useState } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { useDialog } from '../../hooks/useDialog';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from '../profile/Profile';
import InformationsForm from './forms/InformationsForm';
import ProfileForm from './forms/ProfileForm';

function Account() {
  const { user } = useContext(MessagingContext);
  const {
    data: profile,
    error,
    loading,
  } = useData(`users/${user.id}/profile`, { method: 'get' });
  const { dialogRef, setOpen } = useDialog();
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <>
      {displayForm ? (
        <>
          <header>
            <button
              onClick={() => setDisplayForm(false)}
              aria-label="close form"
            >
              <img src="" alt="" />
            </button>
          </header>
          <section>
            {displayForm === 'informations' ? (
              <InformationsForm user={user} />
            ) : (
              <ProfileForm user={user} profile={profile.profile} />
            )}
          </section>
        </>
      ) : (
        <>
          <header>
            <button onClick={() => setOpen(true)} aria-label="settings">
              <img src="" alt="" />
            </button>
          </header>
          <dialog onCancel={() => setOpen(false)} ref={dialogRef}>
            <button onClick={() => setDisplayForm('informations')}>
              Update Private Informations
            </button>
            <button onClick={() => setDisplayForm('profile')}>
              Update Profile
            </button>
          </dialog>
          {error ? (
            <Error error={error} />
          ) : loading ? (
            <Loading contentName="account" />
          ) : (
            <Profile profile={profile.profile} />
          )}
        </>
      )}
    </>
  );
}

export default Account;
