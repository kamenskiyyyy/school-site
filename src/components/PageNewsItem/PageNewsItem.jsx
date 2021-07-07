import './PageNewsItem.css';
import {useHistory} from "react-router-dom";
import {newsApi} from "../../utils/News";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/constants";

function PageNewsItem() {
  const url = useHistory().location.pathname;
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsApi.searchNewsItem(url)
      .then(res => {
        setNews(res[0])
      })
      .catch(err => console.log(err));
  }, [url])

  return (
    <main className='page_news_item page__container'>
      <h1 className='page_news_item__head'>{news.title}</h1>
      <p className='page_news_item__date'>{formatDate(news.date)}</p>
      <div dangerouslySetInnerHTML={{__html: news.description}}/>
    </main>
  )
}

export default PageNewsItem;
