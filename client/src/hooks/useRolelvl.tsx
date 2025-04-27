import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import { getShoortedUserInfo } from '../features/user/userThunk';

const useRoleLvl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo
  );
  const rolelvl = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo.data.role?.rolelvl
  );
  useEffect(() => {
    dispatch(getShoortedUserInfo());
  }, [dispatch ]);

  return { rolelvl, loading, error };
};
export default useRoleLvl;
