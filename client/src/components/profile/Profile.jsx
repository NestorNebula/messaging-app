import PropTypes from 'prop-types';

function Profile({ profile }) {
  return (
    <section>
      <div>
        <img src={`/avatars/${profile.avatar}`} alt="" />
        <div>{profile.user.online ? 'Online' : 'Offline'}</div>
      </div>
      <div>@{profile.user.username}</div>
      <div>{profile.displayName}</div>
      <div>{profile.bio}</div>
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
