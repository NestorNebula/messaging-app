import { useState } from 'react';
import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

function MessageForm({ chat }) {
  const [message, setMessage] = useState('');
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };
  const [file, setFile] = useState('');
  const updateFile = (e) => {
    setFile(e.target.files[0]);
  };
  const filesEmpty = !message && !file;

  return (
    <Form
      method="post"
      onSubmit={() => {
        setFile('');
        setMessage('');
      }}
    >
      <input
        type="file"
        name="file"
        multiple={false}
        onChange={updateFile}
        value={file}
        accept="image/*"
      />
      <textarea
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={updateMessage}
      ></textarea>
      <input type="hidden" name="chatId" value={chat.id} />
      <button
        type={filesEmpty ? 'button' : 'submit'}
        name="intent"
        value="send"
        aria-label="send message"
      >
        +
      </button>
    </Form>
  );
}

MessageForm.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default MessageForm;
