import {NavLink} from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "./Navigation/Navigation";
import './Header.css';
import {useState} from "react";
import {logout} from "../../store/actions/auth";
import {connect} from "react-redux";

function Header(props) {
  const [profileOpen, setProfileOpen] = useState(false);

  function handleProfileClick() {
    setProfileOpen(!profileOpen)
  }

  function handleOpenOff() {
    setProfileOpen(false)
  }

  function handleLogout() {
    props.logout();
  }

  return (
    <header className='page__container header' onMouseLeave={handleOpenOff}>
      <NavLink className='header__logo logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <Navigation/>
      <div className='header__profile'>
        <button onClick={handleProfileClick} className={`header__icon ${props.isAuthenticated && 'header__icon_login'}`}/>
        <div className={`nav__link__drop-menu header__popup ${profileOpen && 'header__popup_open'}`}>
          {props.isAuthenticated
          ?  <>
            <img src={logo} alt="Фотография пользователя"/>
              <ul className='nav__link__drop-menu_list'>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/profile'>Профиль</NavLink></li>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/news'>Добавить новость</NavLink></li>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/' onClick={handleLogout}>Выйти</NavLink></li>
              </ul>
            </>

          : <NavLink to='/signin' className='header__popup_btn header__popup_btn_green'>Войти</NavLink>}
        </div>
      </div>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
