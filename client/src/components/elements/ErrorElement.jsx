import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorElement.module.css';

function ErrorElement() {
  const error = useRouteError();
  return (
    <section className={styles.error}>
      <div>{error.message || error.statusText}</div>
      <div>{error.status}</div>
      {error.status === 404 && <Link to="/">Return to Homepage</Link>}
    </section>
  );
}

export default ErrorElement;
