import { Form } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import Input from '../../input/Input';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
} from '../../../helpers/inputValidation';

function Signup() {
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

  return (
    <Form method="post" aria-label="sign up">
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
      <button>Sign Up</button>
    </Form>
  );
}

export default Signup;
