import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
} from '../../../helpers/inputValidation';
import Input from '../../input/Input';
import PropTypes from 'prop-types';

function InformationsForm({ user }) {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const {
    value: username,
    validation: usernameValidation,
    updateValue: updateUsername,
  } = useInput(validateUsername, user.username);
  const {
    value: email,
    validation: emailValidation,
    updateValue: updateEmail,
  } = useInput(validateEmail, user.email);
  const {
    value: password,
    validation: passwordValidation,
    updateValue: updatePassword,
  } = useInput(validatePassword);
  const {
    value: confirm,
    validation: confirmValidation,
    updateValue: updateConfirm,
  } = useInput(validatePassword);
  const passwordMatchValidation = validatePasswordsMatch(password, confirm);

  return (
    <Form method="put">
      <Input
        name="username"
        value={username}
        update={updateUsername}
        validation={usernameValidation}
      />
      <Input
        name="email"
        value={email}
        update={updateEmail}
        validation={emailValidation}
        type="email"
      />
      {isUpdatingPassword && (
        <>
          <Input
            name="password"
            value={password}
            update={updatePassword}
            validation={passwordValidation}
            type="password"
          />
          <Input
            name="confirm"
            value={confirm}
            update={updateConfirm}
            validation={confirmValidation}
            type="password"
            label="Confirm Password"
          />
        </>
      )}
      <button name="intent" value="update-informations">
        Submit
      </button>
    </Form>
  );
}

InformationsForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default InformationsForm;
