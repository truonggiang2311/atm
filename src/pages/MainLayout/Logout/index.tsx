import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import commonStore from '../../../services/commonStore';

export default function Logout() {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     const store = commonStore('store');

  //     return () => {
  //       store.delete('accessToken');
  //     };
  //   }, []);

  const handleClickLogout = () => {
    const store = commonStore('store');
    store.delete('accessToken');
    navigate('/');
  };
  return (
    <div className="text-end">
      <button onClick={handleClickLogout} type="button" className="btn btn-danger ms-2">
        Log out
      </button>
    </div>
  );
}
