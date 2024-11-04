/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { asyncResponseFetch, getResponseJSON } from '../helpers/fetch';

const useData = (path, options, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncResponseFetch({ path, method: options.method, body: options.body })
      .then((fetch) => {
        if (fetch.error) {
          if (fetch.response.status === 401) {
            setError('Error when fetching data. Please reload the page.');
          } else {
            getResponseJSON(fetch.response).then(({ result }) => {
              setError(result.msg);
            });
          }
        } else {
          getResponseJSON(fetch.response).then(({ result }) => {
            setData(result);
            setError(false);
            setLoading(false);
          });
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, dependencies);

  return { data, error, loading };
};

export { useData };
