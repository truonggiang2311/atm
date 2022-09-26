import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.css';
import { post } from '../../services/httpRequest';
import { useNavigate } from 'react-router-dom';
import commonStore from '../../services/commonStore';
import { PATH_URL } from '../../const/pathUrl';

const cx = classNames.bind(styles);

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeName = (e: any) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = () => {
    const fetchApiLogin = async () => {
      try {
        const response = await post(PATH_URL.login, {
          email: userName,
          password: password,
        });
        const data = await response;
        if (data.sign === false) {
          throw data.message;
        }
        // alert(data.message);

        const store = commonStore('store');
        store.set('accessToken', data.PRIVATE_TOKEN);
        navigate('atm');
      } catch (error) {
        alert(error);
      }
    };
    fetchApiLogin();
  };

  const handleClickRegister = () => {
    const fetchApiRegister = async () => {
      try {
        const response = await post(PATH_URL.register, {
          email: userName,
          password: password,
        });
        const data = await response;
        if (data === 'email already exists !') {
          throw data;
        }
        alert(data.message);
      } catch (error) {
        alert(error);
      }
    };
    fetchApiRegister();
  };

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-lg-4 col-10 text-center">
        <input
          onChange={handleChangeName}
          className="form-control form-control-lg"
          type="text"
          placeholder="Username"
        ></input>
        <input
          onChange={handleChangePassword}
          className="form-control form-control-lg mt-2"
          type="password"
          placeholder="Password"
        ></input>
        <div>
          <button
            onClick={handleClickLogin}
            type="button"
            className={cx('btn btn-secondary mt-3 ps-4 pe-4 btn-login')}
          >
            Login
          </button>
        </div>
        <button onClick={handleClickRegister} type="button" className="btn btn-link">
          Register account
        </button>
      </div>
    </div>
  );
}
