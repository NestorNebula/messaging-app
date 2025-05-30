import { useContext, useState } from 'react';
import { MessagingContext } from '../../context/MessagingContext';
import { useData } from '../../hooks/useData';
import { useDialog } from '../../hooks/useDialog';
import Error from '../elements/Error';
import Loading from '../elements/Loading';
import Profile from '../profile/Profile';
import InformationsForm from './forms/InformationsForm';
import ProfileForm from './forms/ProfileForm';
import dialogStyles from '../elements/Dialog.module.css';
import styles from './Account.module.css';

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
    <main className={styles.main}>
      {displayForm ? (
        <>
          <header className={styles.header}>
            <button
              onClick={() => {
                setDisplayForm(false);
                setOpen(false);
              }}
              aria-label="close form"
            >
              <img src="icons/close.svg" alt="" />
            </button>
          </header>
          <section className={styles.content}>
            {displayForm === 'informations' ? (
              <InformationsForm user={user} />
            ) : (
              <ProfileForm user={user} profile={profile.profile} />
            )}
          </section>
        </>
      ) : (
        <>
          <header className={styles.header}>
            <button onClick={() => setOpen(true)} aria-label="settings">
              <img src="icons/settings.svg" alt="" />
            </button>
          </header>
          <dialog
            onCancel={() => setOpen(false)}
            ref={dialogRef}
            className={dialogStyles.dialog}
          >
            <div className={dialogStyles.dialogContent}>
              <button
                onClick={() => setDisplayForm('informations')}
                className={dialogStyles.dialogBtn}
              >
                Update Private Informations
              </button>
              <button
                onClick={() => setDisplayForm('profile')}
                className={dialogStyles.dialogBtn}
              >
                Update Profile
              </button>
            </div>
          </dialog>
          <section className={styles.content}>
            {error ? (
              <Error error={error} />
            ) : loading ? (
              <Loading contentName="account" />
            ) : (
              <Profile profile={profile.profile} />
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Account;
