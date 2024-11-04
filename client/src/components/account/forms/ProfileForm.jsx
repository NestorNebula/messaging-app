import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import {
  validateDisplayName,
  validateLink,
} from '../../../helpers/inputValidation';
import Input from '../../input/Input';
import PropTypes from 'prop-types';
import avatars from '../../../utils/avatars';

function ProfileForm({ user, profile }) {
  const result = useActionData();
  const {
    value: displayName,
    validation: displayNameValidation,
    updateValue: updateDisplayName,
  } = useInput(validateDisplayName, profile.displayName);

  const [avatar, setAvatar] = useState(profile.avatar);
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
    <Form method="put" aria-label="update profile">
      {result && result.error && <div>{result.error.msg}</div>}
      {result && result.errors && (
        <div>
          {result.errors.map((err) => (
            <div key={err.msg}>{err.msg}</div>
          ))}
        </div>
      )}
      <div>
        {avatars.map((avatar) => (
          <div key={avatar.file}>
            <img src={`avatars/${avatar.file}`} alt={avatar.label} />
            <button
              type="button"
              onClick={() => setAvatar(avatar.file)}
              aria-label="choose avatar"
            ></button>
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
      <textarea name="bio" value={bio} onChange={updateBio}></textarea>
      <Input
        name="link"
        value={link}
        update={updateLink}
        validation={linkValidation}
      />
      <input type="hidden" name="userId" value={user.id} />
      <button
        type={isValid ? 'submit' : 'button'}
        name="intent"
        value="update-profile"
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
