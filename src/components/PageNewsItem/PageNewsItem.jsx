import './PageNewsItem.css';
import {useHistory} from "react-router-dom";
import {newsApi} from "../../utils/News";
import {useEffect, useState} from "react";

function PageNewsItem() {
  const url = useHistory().location.pathname.split('/')[2];
  const [news, setNews] = useState([]);

  const d = new Date(news.date);
  const formatDate = ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();

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
      <p className='page_news_item__date'>{formatDate}</p>
      <div dangerouslySetInnerHTML={{__html: news.description}}/>
    </main>
  )
}

export default PageNewsItem;
