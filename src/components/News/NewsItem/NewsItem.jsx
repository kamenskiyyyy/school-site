import './NewsItem.css';
import {Link} from "react-router-dom";
import {formatDate} from "../../../utils/constants";

function NewsItem({title, img, date, link}) {

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const index = getRandomIntInclusive(0, 3);

  return <Link to={link} className='news-item'>
    <div className='news-item__item'>
      {img ? <img className='news-item__img' src={img} alt={`Картинка новости ${title}`}/> :
        <canvas id={`id${index}`} className='news-item__img'/>}
    </div>
    <div className='news-item__text'>
      <h3 className='news-item__title'>{title}</h3>
      <p className='news-item__date'>{formatDate(date)}</p>
    </div>
  </Link>
}

export default NewsItem;
