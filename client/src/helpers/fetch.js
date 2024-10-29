const getFetchOptions = (method, body) => {
  return {
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

const getAPIUrl = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  return API_URL;
};

const asyncFetch = async ({ url, method, body }) => {
  const response = await fetch(
    `${getAPIUrl()}/${url}`,
    getFetchOptions(method, body)
  );
  const result = await response.json();
  if (response.status >= 400) {
    return { result, error: true };
  }
  return { result, error: false };
};

export { asyncFetch };
