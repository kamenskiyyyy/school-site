import './Main.css';
import Slider from "react-slick";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {getAllNews} from "../../store/actions/news";
import {connect} from "react-redux";
import NewsItem from "../News/NewsItem/NewsItem";
import Preloader from "../Preloader/Preloader";

function Main(props) {
  const {getAllNews, news, newsLoading} = props;

  console.log(newsLoading)

  useEffect(() => {
    getAllNews()
  }, [getAllNews])

  const settingsSlider = {
    dots: true,
    infinite: true,
    autoplay: true,
    className: 'slider-item',
    pauseOnDotsHover: true,
    pauseOnHover: true,
    swipeToSlide: true,
    speed: 500,
    autoplaySpeed: 15000,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <main className='page__container page_main'>
      <div>
        {newsLoading
          ? <Preloader/>
          : <Slider {...settingsSlider}>
            {!!news && news.map((item, i) => {
              if (item.isPreview === true) {
                const doc = new DOMParser().parseFromString(item.description, 'text/html')
                return <div key={i}>
                  <div className='slider-item'>
                    <div className='slider-item__img'>
                      <div style={{background: ` linear-gradient(90deg, transparent 70%, var(--gray-color) 100%)`}}/>
                      <img className='slider-item__img' src={item.cover} alt={`Обложка ${item.title}`}/>
                    </div>
                    <div className='slider-item__text' style={{backgroundColor: 'var(--gray-color'}}>
                      <h3>{item.title}</h3>
                      <p>{doc.querySelector('p').textContent}</p>
                      <Link to={item.guid} className='header__popup_btn'>Подробнее &#8250;</Link>
                    </div>
                  </div>
                </div>
              } else return undefined
            })}
          </Slider>
        }
      </div>
      <div className='page_main__news'>
        <h2 className='page_main__head'>Новости</h2>
        {newsLoading
          ? <Preloader/>
          : <div className='page_news__all'>
            {!!news && news.slice(0, 3).map((item, i) => {
              return <NewsItem key={item._id} title={item.title} date={item.date} img={item.cover} link={item.guid}
                               index={i}/>
            })}
          </div>
        }
        <Link to='/news' className='header__popup_btn page_main__news_btn'>Больше новостей &#8250;</Link>
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    news: state.news.news,
    newsLoading: state.news.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllNews: () => dispatch(getAllNews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
