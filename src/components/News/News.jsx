import './News.css';
import {useEffect, useState} from "react";
import NewsItem from "./NewsItem/NewsItem";
import {connect} from "react-redux";
import {getAllNews} from "../../store/actions/news";

function News(props) {
  const {getAllNews, news} = props;
  let renderedNews = false;

  useEffect(() => {
    getAllNews()
  }, [getAllNews])

  const [initialCardsAmount, setInitialCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 5;
    } else if (size < 920) {
      return 8;
    } else if (size < 1279) {
      return 12;
    } else if (size > 1279) {
      return 12;
    }
  })

  const [addCardsAmount, setAddMoreCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 2;
    } else if (size < 920) {
      return 4;
    } else if (size < 1279) {
      return 4;
    } else if (size > 1279) {
      return 6;
    }
  })

  function handleResize() {
    const size = window.innerWidth;
    if (size < 720) {
      setInitialCardsAmount(5);
      setAddMoreCardsAmount(2);
    } else if (size < 920) {
      setInitialCardsAmount(8);
      setAddMoreCardsAmount(2);
    } else if (size < 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(3);
    } else if (size > 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(4);
    }
  }

  function handleAddNews() {
    setInitialCardsAmount(prev => prev + addCardsAmount);
  }

  if (!!news) {
    renderedNews = news.slice(0, initialCardsAmount);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [])

  return (
    <main className='page_news page__container'>
      <h1 className='page_news__head'>Новости и события</h1>
      <div className='page_news__all'>
        {!!renderedNews && renderedNews.map((item, index) => {
          return <NewsItem key={item._id} title={item.title} date={item.date} img={item.cover} link={item.guid} index={index} />
        })}
      </div>
      {!!news &&
      <button
        className={`page_news__btn ${news.length === renderedNews.length ? 'page_news__btn_hidden' : null}`}
        onClick={handleAddNews}
      >Ещё
      </button>
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
