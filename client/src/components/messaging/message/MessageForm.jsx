import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import PropTypes from 'prop-types';
import { convertFiletoB64String } from '../../../helpers/image';

function MessageForm({ chat }) {
  const result = useActionData();
  const [message, setMessage] = useState('');
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };
  const [file, setFile] = useState(false);
  const updateFile = async (e) => {
    const result = await convertFiletoB64String(e.target.files[0]);
    if (!result) return;
    setFile(result);
  };
  const filesEmpty = !message && !file;

  return (
    <Form
      method="post"
      onSubmit={() => {
        setFile(false);
        setMessage('');
      }}
    >
      <div>{result && !result.success && result.error.msg}</div>
      <input
        type="file"
        name="uploadfile"
        multiple={false}
        onChange={updateFile}
        accept="image/*"
      />
      <textarea
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={updateMessage}
      ></textarea>
      <input type="hidden" name="chatId" value={chat.id} />
      <input type="hidden" name="file" value={file} />
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
