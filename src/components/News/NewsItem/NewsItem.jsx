import './NewsItem.css';
import {NavLink} from "react-router-dom";

function NewsItem({title, img, date, link}) {
  const d = new Date(date);
  const formatDate = ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const index = getRandomIntInclusive(0, 3);

  return <NavLink to={link} className='news-item'>
    <div className='news-item__item'>
      {img ? <img className='news-item__img' src={img} alt={`Картинка новости ${title}`}/> :
        <canvas id={`id${index}`} className='news-item__img'/>}
    </div>
    <div className='news-item__text'>
      <h3 className='news-item__title'>{title}</h3>
      <p className='news-item__date'>{formatDate}</p>
    </div>
  </NavLink>
}

export default NewsItem;
