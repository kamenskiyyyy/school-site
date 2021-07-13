import './Footer.css';
import {NavLink} from "react-router-dom";
import vk from '../../images/icon_vk.svg';
import rss from '../../images/icon_rss.svg';
import {serverUrl} from "../../utils/constants";

function Footer() {
  return (
    <footer className='footer'>
      <div className='page__container footer__content'>
        <div className='footer__item'>
          <h3 className='footer__head'>&#160;</h3>
          <NavLink className='footer__text' to='/svedeniya'>Сведения об образовательной организации</NavLink>
          <p id='year' className='footer__text'>&#169; {new Date().getFullYear()} ГБОУ СОШ №390</p>
          <NavLink className='footer__text' to='/os'>Обратная связь</NavLink>
        </div>
        <div className='footer__item'>
          <h3 className='footer__head'>Контакты</h3>
          <p className='footer__text'><span>Адрес:</span> Санкт-Петербург г, Здоровцева ул, 33, А, 2, 198259</p>
          <p className='footer__text'><span>Телефон:</span> 8-812-417-52-82</p>
          <p className='footer__text'><span>Email:</span> school390spb@gmail.com</p>
        </div>
        <div className='footer__item'>
          <h3 className='footer__head'>&#160;</h3>
          <div>
            <a href="https://vk.com/spbschool390" target='_blank' rel="noreferrer">
              <img className='footer__icon' src={vk} alt="Иконка сайта ВКонтакте"/></a>
            <a href={`${serverUrl}/rss`} target='_blank' rel="noreferrer">
              <img src={rss} alt="Иконка RSS ленты"/></a>
          </div>
          <NavLink className='footer__text' to='/os'>Версия для слабовидящих</NavLink>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
