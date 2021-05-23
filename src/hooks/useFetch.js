import { useEffect, useReducer, useRef } from 'react';

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetch/pending':
      return { ...state, status: 'loading' };
    case 'fetch/fulfilled':
      return { ...state, status: 'succeeded', entities: action.payload };
    case 'fetch/rejected':
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
}

function useFetch(req, ...params) {
  const initialState = {
    status: 'idle',
    entities: null,
    error: null
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const simpleCache = useRef({});

  useEffect(() => {
    let terminate = false;

    if (!req) {
      return;
    }

    // eslint-disable-next-line consistent-return
    const fetchData = async () => {
      dispatch({ type: 'fetch/pending' });

      const key = `${req.toString()}/${params}`.replace('\n\t', '');

      if (simpleCache.current[key]) {
        const data = simpleCache.current[key];
        dispatch({ type: 'fetch/fulfilled', payload: data });
      } else {
        try {
          const res = await req(...params);
          simpleCache.current[key] = res;

          if (terminate) {
            return;
          }

          dispatch({ type: 'fetch/fulfilled', payload: res });
        } catch (error) {
          if (terminate) {
            return;
          }

          dispatch({ type: 'fetch/rejected', payload: error.message });
        }
      }
    };

    fetchData();

    // eslint-disable-next-line consistent-return
    return () => {
      terminate = true;
    };
  }, [req, ...params]);

  return state;
}

export default useFetch;
