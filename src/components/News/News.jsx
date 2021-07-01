import './News.css';
import {newsApi} from "../../utils/News";
import {useEffect, useState} from "react";
import NewsItem from "./NewsItem/NewsItem";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsApi.getAllNews()
      .then(res => {
        setNews(res)
      })
      .catch(err => console.log(err));
  }, [])
  console.log(news)

  return (
    <main className='page_news'>
      <h1 className='page_news__head'>Новости и события</h1>
      <div className='page_news__all'>
        {news.map((item, index) => {
          return <NewsItem key={item._id} title={item.title} date={item.date} img={item.preview} link={item.guid} index={index} />
        })}
      </div>
    </main>
  )
}

export default News;
