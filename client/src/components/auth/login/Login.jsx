import { Form, useActionData, Link } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput';
import Input from '../../input/Input';
import {
  validateUsermail,
  validatePassword,
} from '../../../helpers/inputValidation';
import formStyles from '../../account/forms/Form.module.css';

function Login() {
  const result = useActionData();
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
  const validations = [usermailValidation, passwordValidation];
  const valid = validations.every((validation) => validation.isValid);

  return (
    <>
      <Form method="post" aria-label="log in" className={formStyles.form}>
        {result && <div className={formStyles.error}>{result.error.msg}</div>}
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
        <button
          type={valid ? 'submit' : 'button'}
          className={formStyles.submitBtn}
        >
          Log In
        </button>
      </Form>
      <div className={formStyles.link}>
        {`Doesn't have an account yet? `}
        <Link to="/auth/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
