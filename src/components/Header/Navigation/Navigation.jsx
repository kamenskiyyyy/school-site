import {useEffect, useState} from "react";
import './Navigation.css';
import Link from "./Link/Link";
import {connect} from "react-redux";
import {getNavData} from "../../../store/actions/nav";

function Navigation(props) {
  const [isNavOpened, setIsNavOpened] = useState(false);                                             // Стейт мобильная навигация открыта

  // Обработчик клика по меню
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  function handleOffNavClick() {
    setIsNavOpened(false);
  }

  useEffect(() => {
    props.getNavData();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <button type='button' className={`nav__btn ${isNavOpened && 'opened'}`}
              onClick={handleNavClick}
              aria-label="Main Menu">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
          <path className="line line2" d="M 20,50 H 80"/>
          <path className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
        </svg>
      </button>
      <nav className={`nav ${isNavOpened && 'nav__mobile'}`}>
        <ul className={`nav__list ${isNavOpened && 'nav__list_mobile'}`}>
          {props.navigate.map((nav, index) => {
            return <Link handleOffNavClick={handleOffNavClick} key={index}
                         isNavOpened={isNavOpened} nav={nav}/>
          })}

        </ul>
      </nav>
    </>
  )
}

function mapStateToProps(state) {
  return {
    navigate: state.nav.nav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNavData: () => dispatch(getNavData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
