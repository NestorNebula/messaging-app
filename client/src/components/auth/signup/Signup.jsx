import { Form, useActionData, Link } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import Input from '../../input/Input';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
} from '../../../helpers/inputValidation';
import formStyles from '../../account/forms/Form.module.css';

function Signup() {
  const result = useActionData();
  const {
    value: username,
    validation: usernameValidation,
    updateValue: updateUsername,
  } = useInput(validateUsername);
  const {
    value: email,
    validation: emailValidation,
    updateValue: updateEmail,
  } = useInput(validateEmail);
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

  const checkSubmitValidity = () => {
    const validations = [
      usernameValidation,
      emailValidation,
      passwordValidation,
      confirmValidation,
    ];
    return (
      validations.every((validation) => validation.isValid) &&
      !passwordMatchValidation
    );
  };
  const valid = checkSubmitValidity();

  return (
    <>
      <Form method="post" aria-label="sign up" className={formStyles.form}>
        {result && result.error && <div>{result.error.msg}</div>}
        {result && result.errors && (
          <div>
            {result.errors.map((err, index) => (
              <div key={index}>{err.msg}</div>
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
        {passwordMatchValidation && <div>{passwordMatchValidation}</div>}
        <button
          type={valid ? 'submit' : 'button'}
          className={formStyles.submitBtn}
        >
          Sign Up
        </button>
      </Form>
      <div className={formStyles.link}>
        Already have an account?
        <Link to="/auth/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
