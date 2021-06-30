import {NavLink} from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "./Navigation/Navigation";
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <NavLink className='header__logo logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <Navigation />
    </header>
    )
}

export default Header;
