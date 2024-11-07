import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import {
  validateDisplayName,
  validateLink,
} from '../../../helpers/inputValidation';
import Input from '../../input/Input';
import { updateAreaMinHeight } from '../../../helpers/textarea';
import PropTypes from 'prop-types';
import avatars from '../../../utils/avatars';
import formStyles from './Form.module.css';
import styles from './ProfileForm.module.css';

function ProfileForm({ user, profile }) {
  const result = useActionData();
  const {
    value: displayName,
    validation: displayNameValidation,
    updateValue: updateDisplayName,
  } = useInput(validateDisplayName, profile.displayName);

  const [avatar, setAvatar] = useState(profile.avatar);
  const getAvatar = () => avatar;
  const [bio, setBio] = useState(profile.bio);
  const updateBio = (e) => {
    setBio(e.target.value);
  };
  const {
    value: link,
    validation: linkValidation,
    updateValue: updateLink,
  } = useInput(validateLink, profile.link || '');

  const validations = [displayNameValidation, linkValidation];
  const isValid =
    validations.every((validation) => validation.isValid) &&
    avatars.some((a) => a.file === avatar);

  return (
    <Form
      method="put"
      aria-label="update profile"
      className={`${formStyles.form} ${styles.profileForm}`}
    >
      {result && result.error && (
        <div className={formStyles.error}>{result.error.msg}</div>
      )}
      {result && result.errors && (
        <div className={formStyles.errors}>
          {result.errors.map((err) => (
            <div key={err.msg}>{err.msg}</div>
          ))}
        </div>
      )}
      <div>Choose an avatar</div>
      <div className={styles.avatarChoice}>
        {avatars.map((avatar) => (
          <div key={avatar.file} className={`${styles.avatar}`}>
            <img src={`avatars/${avatar.file}`} alt={avatar.label} />
            <button
              type="button"
              onClick={() => setAvatar(avatar.file)}
              aria-label="choose avatar"
            >
              {avatar.file == getAvatar() && (
                <div className={styles.selected}></div>
              )}
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name="avatar" value={avatar} />
      <Input
        name="displayName"
        value={displayName}
        update={updateDisplayName}
        validation={displayNameValidation}
        label="Display Name"
      />
      <div className={styles.bio}>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={updateBio}
          onKeyUp={updateAreaMinHeight}
        ></textarea>
      </div>
      <Input
        name="link"
        value={link}
        update={updateLink}
        validation={linkValidation}
        required={false}
      />
      <input type="hidden" name="userId" value={user.id} />
      <button
        type={isValid ? 'submit' : 'button'}
        name="intent"
        value="update-profile"
        className={formStyles.submitBtn}
      >
        Submit
      </button>
    </Form>
  );
}

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileForm;
