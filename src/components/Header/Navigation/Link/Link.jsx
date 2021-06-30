import {NavLink} from "react-router-dom";
import {useState} from "react";

function Link({nav, index, handleOffNavClick, isNavOpened}) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return <li key={index} className='nav__link__list_item' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
    <NavLink activeClassName='nav__link_active' onClick={handleOffNavClick}
             className={`nav__link ${isNavOpened && 'nav__link_mobile'}`} to={nav.path}>{nav.name}</NavLink>
    <div className={`nav__link__drop-menu ${hovered && 'drop-menu__open'}`}>
      <ul className='nav__link__drop-menu_list'>
        {nav.dropMenu && nav.dropMenu.map((drop, index) => {
          return <li key={index}><NavLink exact activeClassName='nav__link_active' onClick={handleOffNavClick}
                                          className={`nav__link drop-menu__link ${isNavOpened && 'nav__link_mobile'}`}
                                          to={drop.path}>{drop.name}</NavLink></li>
        })}
      </ul>
    </div>
  </li>
}

export default Link;
