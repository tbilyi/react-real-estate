import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SignUp from '../../components/Auth/SignUp/SignUp';
import Auth from '../../components/Auth/Auth';
import TraderActions from '../../components/TraderActions/TraderActions';

const Account = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [registered, setRegistered] = useState(0);

  useMemo(() => {
    if (userId) setRegistered(3);
  }, [userId]);

  return (
    <>
      { registered === 1 || registered === 2 ? (
          <SignUp registered={registered} setRegistered={setRegistered} />)
        : registered === 3 ? (<TraderActions />)
          : (<Auth setRegistered={setRegistered} />)}
    </>
  );
};

export default Account;