import './Main.css';
import Slider from "react-slick";
import analyze from 'rgbaster'
import url from '../../images/pattern2.png';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getAllNews} from "../../store/actions/news";
import {connect} from "react-redux";
import NewsItem from "../News/NewsItem/NewsItem";


function Main(props) {
  const [color, setColor] = useState();
  const {getAllNews, news} = props;

  useEffect(() => {
    getAllNews()
  }, [getAllNews])

  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    analyze(url, {ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'], scale: 0.6})
      .then(item => {
        console.log(item[0].color)
        setColor(item[0].color)
      })
  }, [color])


  console.log(color)


  return (
    <main className='page__container page_main'>
      <div>
        <Slider {...settingsSlider}>
          <div>
            <div className='slider-item'>
              <div className='slider-item__img'>
                <div style={{background: ` linear-gradient(90deg, transparent 70%, ${color} 100%)`}}/>
                <img className='slider-item__img' src={url} alt="Обложка"/>
              </div>
              <div className='slider-item__text' style={{backgroundColor: color}}>
                <h3>Остановим Covid-19 вместе!</h3>
                <p>Чаще мойте руки с мылом. * Носите медицинскую маску. * Соблюдайте меры личной гигиены. * Не посещайте
                  места массового скопления людей. * При появлении признаков респираторных заболеваний обратитесь к
                  врачу.</p>
                <Link to='/' className='header__popup_btn'>Подробнее &#8250;</Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div className='page_main__news'>
        <h2 className='page_main__head'>Новости</h2>
        <div className='page_news__all'>
          {!!news && news.slice(0, 3).map((item, i) => {
            return <NewsItem key={item._id} title={item.title} date={item.date} img={item.cover} link={item.guid} index={i} />
          })}
        </div>
        <Link to='/news' className='header__popup_btn page_main__news_btn'>Больше новостей &#8250;</Link>
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    news: state.news.news
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    getAllNews: () => dispatch(getAllNews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
