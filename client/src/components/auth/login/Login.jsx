import { Form } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import Input from '../../input/Input';
import {
  validateUsermail,
  validatePassword,
} from '../../../helpers/inputValidation';

function Login() {
  const {
    value: usermail,
    validation: usermailValidation,
    updateValue: updateUsermail,
  } = useInput(validateUsermail);
  const {
    value: password,
    validation: passwordValidation,
    updateValue: updatePassword,
  } = useInput(validatePassword);

  return (
    <Form method="post" aria-label="log in">
      <Input
        name="username"
        value={usermail}
        update={updateUsermail}
        validation={usermailValidation}
        label="Username or Email"
      />
      <Input
        name="password"
        value={password}
        update={updatePassword}
        validation={passwordValidation}
        type="password"
      />
      <button>Log In</button>
    </Form>
  );
}

export default Login;
