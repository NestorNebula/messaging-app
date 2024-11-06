import PropTypes from 'prop-types';
import styles from './Profile.module.css';

function Profile({ profile }) {
  return (
    <section className={styles.profile}>
      <div className={styles.profileAvatar}>
        <img src={`/avatars/${profile.avatar}`} alt="" />
        <div
          className={`${styles.status} ${
            profile.user.online ? styles.online : styles.offline
          }`}
        ></div>
      </div>
      <div className={styles.username}>
        <div>@</div>
        <div>{profile.user.username}</div>
      </div>
      <div className={styles.displayName}>{profile.displayName}</div>
      <div className={styles.bio}>{profile.bio}</div>
      <a href={profile.link} target="_blank" rel="noopener noreferrer">
        {profile.link}
      </a>
    </section>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
