import './PageItem.css';
import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {pageApi} from "../../utils/Pages";

function PageItem(props) {
  const url = useHistory().location.pathname;
  const [page, setPage] = useState([]);

  useEffect(() => {
    pageApi.getPage(url)
      .then(res => {
        setPage(res[0])
      })
      .catch(err => console.log(err));
  }, [url])

  console.log(page)

  return (
    <main className='page__container page_news_item'>
      {props.user.role === 'admin'
      && <div className='page_news_item__buttons'>
        <Link to={{
          pathname: '/editor',
          state: {
            title: 'Редактировать страницу',
            forPage: true,
            data: page,
            isEdit: true,
            id: page._id
          }}} className='header__popup_btn header__popup_btn_green page_news_item__button'>Редактировать</Link>
        <button className='header__popup_btn page_news_item__button page_news_item__button_gray'>Архивировать</button>
        <button className='header__popup_btn page_news_item__button page_news_item__button_red'>Удалить</button>
      </div>
      }
      <h1 className='page_news_item__head'>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html: page.description}}/>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(PageItem);
