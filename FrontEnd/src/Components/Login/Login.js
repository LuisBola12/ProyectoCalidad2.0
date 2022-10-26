
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../Slices/user/requests/postLogin';
import { Navigate, useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
import './LoginStyle.scss';

export const LoginComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  };
  const handleAboutUs = () => {
    navigate('/aboutUs');
  };

  const logBtn = async () => {
    dispatch(postLogin({ email, password }));
  };

  return userIsLoggedIn ? (
    <Navigate to='/projects' />
  ) : (
    <div className='logIn-page'>
      <div className='logIn-logo-box'>
        <div className='logIn-logo-AppName'>
          <div className='logIn-logo' onClick={handleAboutUs}></div>
          <div className='logIn-AppName'>Payroll System</div>
        </div>
        <p className='logIn-text'>  {`Our payroll system seeks to help manage your payments
                                    in an autonomous and simplified way, making sure to 
                                    accomplish the disposals of the worker's law, as well 
                                    as those benefits and needs that the employee requests.`}
        </p>
      </div>
      <div className='logIn-box'>
        <div className='login-animated-input-email'>
          <input
            type='text'
            id='email_login'
            className='login-animated-input-email__input'
            value={email}
            maxLength={50}
            onChange={(e) => { setEmail(e.target.value); }}
            autoComplete='off'
            placeholder=' ' />
          <label htmlFor='email_login' className='login-animated-input-email__label'> Email <span className='req'>*</span> </label>
        </div>

        <div className='login-animated-input-email'>
          <input
            type='password'
            id='password_login'
            className='login-animated-input-email__input'
            value={password}
            maxLength={20}
            onChange={(e) => { setPassword(e.target.value); }}
            autoComplete='off'
            placeholder=' ' />
          <label htmlFor='password_login' className='login-animated-input-email__label'> Password <span className='req'>*</span> </label>
        </div>

        <div className='logIn-btn-box'>
          <button className='logIn-btn-login' onClick={logBtn}>
            Sign In
          </button>
          <div>
            {
              errorMessage && (
                <span className='logIn-error-message' >{errorMessage}</span>
              )
            }
          </div>
          <hr className='linea-horizontal'></hr>
          <button className='logIn-btn-CheckIn' onClick={handleClick}>
            Sign Up
          </button>
        </div>
      </div>
      <footer className='logIn-footerCopyRights'> &copy; SeleMiracleRun </footer>
    </div>
  );
};
