import { useCallback, useState } from 'react';
import { useAppDispatch } from '..';
import { BundlerInput, createBundle } from '../thunks/createBundle';

export const useCreateBundle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const runBundler = useCallback(
    (arg: BundlerInput) => {
      setLoading(true);
      dispatch(createBundle(arg))
        .unwrap()
        .catch(err => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
        })
        .finally(() => setLoading(false));
    },
    [dispatch]
  );
  const returnArray: [boolean, string, (arg: BundlerInput) => void] = [
    loading,
    error,
    runBundler,
  ];
  return returnArray;
};
