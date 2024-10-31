import PropTypes from 'prop-types';

function Profile({ profile }) {
  return (
    <section>
      <img src={`avatars/${profile.avatar}`} alt="" />
      <div>@{profile.user.username}</div>
      <div>{profile.displayName}</div>
      <div>{profile.bio}</div>
      <div>{profile.link}</div>
    </section>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
