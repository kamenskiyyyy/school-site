import './Login.css';
import {useValidationForm} from "../../hooks/useValidationForm";

function Login(props) {
  const {values, handleErrors, errors, isValid} = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(e, values.login, values.password);
  }

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

export default Login;
