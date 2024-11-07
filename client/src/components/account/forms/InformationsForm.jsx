import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
} from '../../../helpers/inputValidation';
import Input from '../../input/Input';
import PropTypes from 'prop-types';
import formStyles from './Form.module.css';
import styles from './InformationsForm.module.css';

function InformationsForm({ user }) {
  const result = useActionData();
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
  const validations = isUpdatingPassword
    ? [
        usernameValidation,
        emailValidation,
        passwordValidation,
        confirmValidation,
      ]
    : [usernameValidation, emailValidation];
  const isValid =
    validations.every((validation) => validation.isValid) &&
    (!isUpdatingPassword || !passwordMatchValidation);

  return (
    <Form
      method="put"
      aria-label="update private informations"
      className={formStyles.form}
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
            label="New Password"
          />
          <Input
            name="confirm"
            value={confirm}
            update={updateConfirm}
            validation={confirmValidation}
            type="password"
            label="Confirm New Password"
          />
          {passwordMatchValidation && <div>{passwordMatchValidation}</div>}
        </>
      )}
      <input
        type="checkbox"
        id="checkbox"
        onClick={() => setIsUpdatingPassword(!isUpdatingPassword)}
        className={styles.checkboxInput}
      />
      <label htmlFor="checkbox" className={styles.checkbox}>
        Update Password ?
      </label>
      <input type="hidden" name="userId" value={user.id} />
      <button
        type={isValid ? 'submit' : 'button'}
        name="intent"
        value="update-informations"
        className={formStyles.submitBtn}
      >
        Submit
      </button>
    </Form>
  );
}

InformationsForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default InformationsForm;
