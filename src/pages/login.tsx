import {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks';
import {loginAction} from '../store/slices/user-slice.ts';
import {selectAuthorizationStatus, selectLoginError, selectLoginStatus} from '../store/selectors';
import {AuthorizationStatus} from '../const/auth.ts';
import {RequestStatuses} from '../const/api.ts';
import {LoginData} from '../types/user.ts';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const loginStatus = useAppSelector(selectLoginStatus);
  const loginError = useAppSelector(selectLoginError);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [credentials, setCredentials] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setCredentials((prev) => ({...prev, [name]: value}));
    setValidationError(null);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const password = credentials.password.trim();
    const email = credentials.email.trim();
    const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);

    if (!isPasswordValid) {
      setValidationError('Password must contain at least one letter and one number.');
      return;
    }

    dispatch(loginAction({email, password}));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={'/'}>
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {(validationError || loginError) && (
                <p className="form__error">{validationError ?? loginError}</p>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={loginStatus === RequestStatuses.Loading}
              >
                {loginStatus === RequestStatuses.Loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
