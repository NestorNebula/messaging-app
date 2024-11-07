import { Link, useRouteError } from 'react-router-dom';

function ErrorElement() {
  const error = useRouteError();
  return (
    <section>
      <div>
        <div>{error.message || error.statusText}</div>
        <div>{error.status}</div>
      </div>
      {error.status === 404 && <Link to="/">Return to Homepage</Link>}
    </section>
  );
}

export default ErrorElement;
