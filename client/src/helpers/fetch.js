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

const asyncFetch = async ({ path, method, body }) => {
  const response = await fetch(
    `${getAPIUrl()}/${path}`,
    getFetchOptions(method, body)
  );
  const result = await response.json();
  if (response.status >= 400) {
    return { result, error: true };
  }
  return { result, error: false };
};

const asyncResponseFetch = async ({ path, method, body }) => {
  const response = await fetch(
    `${getAPIUrl()}/${path}`,
    getFetchOptions(method, body)
  );
  if (response.status >= 400) {
    return { response, error: true };
  }
  return { response, error: false };
};

const getResponseJSON = async (response) => {
  const result = await response.json();
  return { result };
};

const getFetchError = async (fetch, unauthorizedMessage) => {
  if (fetch.error && fetch.response.status === 401) {
    return {
      success: false,
      error: {
        msg: unauthorizedMessage,
      },
    };
  }
  const { result } = await getResponseJSON(fetch.response);
  return {
    success: false,
    error: {
      msg: result.error.msg,
    },
  };
};

export { asyncFetch, asyncResponseFetch, getResponseJSON, getFetchError };
