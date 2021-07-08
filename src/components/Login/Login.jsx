import './Login.css';
import {useValidationForm} from "../../hooks/useValidationForm";
import {auth} from "../../store/actions/auth";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

function Login(props) {
  const history = useHistory();
  const {values, handleErrors, errors, isValid} = useValidationForm();

  // Обработчик по кнопке Войти
  function handleLogin(e, login, password) {
    props.auth(e, login, password)
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(e, values.login, values.password);
    history.push('/profile')
  }

  useEffect(() => {
    if (props.isLogin) {
      history.push('/profile')
    }
  }, [history, props.isLogin])

  return (
    <main className='login page__container'>
      <h1 className='login__head'>Авторизация</h1>
      <form name='login-form' className='login__form' onSubmit={handleSubmit}>
        <label className='login__form_label'>Логин</label>
        <input
          required
          autoComplete='off'
          className={`login__form_input ${errors.login && 'error'}`}
          type="login"
          name="login"
          value={values.login || ''}
          onChange={handleErrors}/>
        <span className='login__form_span'>{errors.login}</span>
        <label className='login__form_label'>Пароль</label>
        <input
          required
          autoComplete='off'
          className={`login__form_input ${errors.password && 'error'}`}
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleErrors}/>
        <span className='login__form_span'>{errors.password}</span>
        <button type='submit' className={`login_btn ${!isValid && 'login_btn-disabled'}`} disabled={!isValid}>Войти</button>
      </form>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (e, login, password) => dispatch(auth(e, login, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
