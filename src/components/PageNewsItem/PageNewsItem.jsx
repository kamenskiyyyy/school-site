import './PageNewsItem.css';
import {useHistory} from "react-router-dom";
import {newsApi} from "../../utils/News";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/constants";

function PageNewsItem() {
  const url = useHistory().location.pathname.split('/')[2];
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsApi.searchNewsItem(url)
      .then(res => {
        setNews(res)
      })
      .catch(err => console.log(err));
  }, [url])

  console.log(news)

  // function htmlDecode(input) {
  //   const e = document.createElement('div');
  //   e.innerHTML = input;
  //   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  // }

  return (
    <main className='page_news_item'>
      <h1 className='page_news_item__head'>{news.title}</h1>
      <p className='page_news_item__date'>{formatDate(news.date)}</p>
      <div dangerouslySetInnerHTML={{__html: news.description}}/>
    </main>
  )
}

export default PageNewsItem;
