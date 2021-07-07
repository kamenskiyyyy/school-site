import './PageNewsItem.css';
import {Link, useHistory} from "react-router-dom";
import {newsApi} from "../../utils/News";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/constants";
import {connect} from "react-redux";

function PageNewsItem(props) {
  const url = useHistory().location.pathname;
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsApi.getNewsItem(url)
      .then(res => {
        setNews(res[0])
      })
      .catch(err => console.log(err));
  }, [url])

  return (
    <main className='page__container page_news_item'>
      {props.user.role === 'admin'
      && <div className='page_news_item__buttons'>
        <Link to={{
          pathname: '/editor',
          state: {
            title: 'Редактировать новость',
            data: news,
            isEdit: true,
            id: news._id
          }}} className='header__popup_btn header__popup_btn_green page_news_item__button'>Редактировать</Link>
        <button className='header__popup_btn page_news_item__button page_news_item__button_gray'>Архивировать</button>
        <button className='header__popup_btn page_news_item__button page_news_item__button_red'>Удалить</button>
      </div>
      }
      <h1 className='page_news_item__head'>{news.title}</h1>
      <p className='page_news_item__date'>{formatDate(news.date)}</p>
      <div dangerouslySetInnerHTML={{__html: news.description}}/>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(PageNewsItem);
