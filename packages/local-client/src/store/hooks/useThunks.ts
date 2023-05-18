import { useCallback, useState } from 'react';
import { useAppDispatch } from '..';
interface ThunkReturn {
  loading: boolean;
  error: null | string;
  runThunk: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThunk = (thunk: any): ThunkReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const runThunk = useCallback(() => {
    setLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, thunk]);

  return { loading, error, runThunk };
};
