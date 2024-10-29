const testRegex = (value, regex, failureMessage) => {
  const match = regex.test(value);
  return !match ? failureMessage : '';
};

const validateUsername = (username) => {
  let message = '';
  if (username.length <= 2 || username.length > 30) {
    message += 'Username must have between 3 and 30 characters. ';
  }
  const regex = new RegExp('^[a-z][a-z0-9-_.]*$');
  message += testRegex(
    username,
    regex,
    'Username must start with a letter, be lowercase and can only contain letters, numbers, dashes and points. '
  );
  return message;
};

const validateEmail = (email) => {
  let message = '';
  const regex = new RegExp('^[\\w-\\.]+@[\\w]+\\.[\\w]{2,4}$');
  message += testRegex(email, regex, 'Email must have an email format. ');
  return message;
};

const validatePassword = (password) => {
  let message = '';
  const regex = new RegExp('^[\\S]{8,}$');
  message += testRegex(
    password,
    regex,
    'Password must have at least 8 characters.'
  );
  return message;
};

const validatePasswordsMatch = (password, confirmPwd) => {
  let message = '';
  const match = password === confirmPwd;
  if (!match) message += "Passwords don't match.";
  return message;
};

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
};
