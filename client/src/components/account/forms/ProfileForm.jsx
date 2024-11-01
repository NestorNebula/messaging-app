import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import {
  validateDisplayName,
  validateLink,
} from '../../../helpers/inputValidation';
import Input from '../../input/Input';
import PropTypes from 'prop-types';
import avatars from '../../../utils/avatars';

function ProfileForm({ profile }) {
  const {
    value: displayName,
    validation: displayNameValidation,
    updateValue: updateDisplayName,
  } = useInput(validateDisplayName, profile.displayName);
  const [bio, setBio] = useState('');
  const updateBio = (e) => {
    setBio(e.target.value);
  };
  const {
    value: link,
    validation: linkValidation,
    updateValue: updateLink,
  } = useInput(validateLink, profile.link);
  return (
    <Form method="put" aria-label="update profile">
      <div>
        {avatars.map((avatar) => (
          <div key={avatar.file}>
            <img src={`avatars/${avatar.file}`} alt={avatar.label} />
            <button></button>
          </div>
        ))}
      </div>
      <input type="hidden" name="avatar" />
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
      <button name="intent" value="update-profile">
        Submit
      </button>
    </Form>
  );
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileForm;
