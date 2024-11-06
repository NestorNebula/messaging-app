import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import PropTypes from 'prop-types';
import { convertFiletoB64String } from '../../../helpers/image';
import styles from './MessageForm.module.css';

function MessageForm({ chat }) {
  const result = useActionData();
  const [message, setMessage] = useState('');
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const updateFile = async (e) => {
    if (!e.target.files[0]) {
      setFileName('');
      return;
    }
    setFileName(e.target.files[0].name);
    const result = await convertFiletoB64String(e.target.files[0]);
    if (!result) return;
    setFile(result);
  };
  const filesEmpty = !message && !file;

  const updateAreaHeight = (e) => {
    e.target.style.height =
      e.target.scrollHeight > e.target.clientHeight
        ? e.target.scrollHeight + 'px'
        : 'auto';
  };

  return (
    <Form
      method="post"
      onSubmit={() => {
        setFile(false);
        setFileName('');
        setMessage('');
      }}
      className={styles.messageForm}
    >
      <div className={result && result.error && styles.error}>
        {result && !result.success && result.error.msg}
      </div>
      <div className={styles.fileWrapper}>
        <input
          id="fileinput"
          type="file"
          name="uploadfile"
          multiple={false}
          onChange={updateFile}
          accept="image/*"
          className={styles.fileInput}
        />
        <label htmlFor="fileinput" className={styles.fileLabel}>
          <img src="icons/camera.png" alt="" aria-label="add image" />
        </label>
        <span>{fileName}</span>
      </div>
      <textarea
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={updateMessage}
        onKeyUp={updateAreaHeight}
        className={styles.textarea}
      ></textarea>
      <input type="hidden" name="chatId" value={chat.id} />
      <input type="hidden" name="file" value={file} />
      <button
        type={filesEmpty ? 'button' : 'submit'}
        name="intent"
        value="send"
        aria-label="send message"
      >
        <img src="icons/send.png" alt="" />
      </button>
    </Form>
  );
}

MessageForm.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default MessageForm;
