import {useState} from "react";
import './Navigation.css';
import Link from "./Link/Link";
import {navLinksList} from "../../../utils/constants";

function Navigation() {
  const [isNavOpened, setIsNavOpened] = useState(false);                                             // Стейт мобильная навигация открыта


  // Обработчик клика по меню
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  function handleOffNavClick() {
    setIsNavOpened(false);
  }


  return (
    <>
      <button type='button' className={`nav__btn ${isNavOpened && 'nav__btn_close'}`} onClick={handleNavClick}/>
      <nav className={`nav ${isNavOpened && 'nav__mobile'}`}>
        <ul className={`nav__list ${isNavOpened && 'nav__list_mobile'}`}>
          {navLinksList.map((nav, index) => {
            return <Link handleOffNavClick={handleOffNavClick} key={index}
                         isNavOpened={isNavOpened} nav={nav}/>
          })}

        </ul>
      </nav>
    </>
  )
}

export default Navigation;
