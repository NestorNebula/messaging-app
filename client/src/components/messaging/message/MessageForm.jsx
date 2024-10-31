import { useState } from 'react';
import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

function MessageForm({ user, chat }) {
  const [message, setMessage] = useState('');
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Form method="post">
      <input type="file" accept="image/*" />
      <textarea
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={updateMessage}
      ></textarea>
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="chatId" value={chat.id} />
      <button name="intent" value="send" aria-label="send message">
        +
      </button>
    </Form>
  );
}

MessageForm.propTypes = {
  user: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};

export default MessageForm;
