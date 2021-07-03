import {NavLink} from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "./Navigation/Navigation";
import './Header.css';
import {useState} from "react";

function Header({isLogin}) {
  const [profileOpen, setprofileOpen] = useState(false);

  function handleProfileClick() {
    setprofileOpen(!profileOpen)
  }

  return (
    <header className='page__container header' onMouseLeave={handleProfileClick}>
      <NavLink className='header__logo logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <Navigation/>
      <div className='header__profile'>
        <button onClick={handleProfileClick} className={`header__icon ${isLogin && 'header__icon_login'}`}/>
        <div className={`nav__link__drop-menu header__popup ${profileOpen && 'header__popup_open'}`}>
          {isLogin
          ?  <>
            <img src={logo} alt="Фотография пользователя"/>
              <ul className='nav__link__drop-menu_list'>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/logout'>Профиль</NavLink></li>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/logout'>Добавить новость</NavLink></li>
                <li><NavLink className={`nav__link drop-menu__link header__popup_link`} to='/logout'>Выйти</NavLink></li>
              </ul>
            </>

          : <NavLink to='/signin' className='header__popup_btn header__popup_btn_green'>Войти</NavLink>}
        </div>
      </div>
    </header>
  )
}

export default Header;
