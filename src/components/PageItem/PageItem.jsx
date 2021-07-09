import './PageItem.css';
import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {pageApi} from "../../utils/Pages";
import {deletePage} from "../../store/actions/editor";

function PageItem(props) {
  const history = useHistory();
  const url = useHistory().location.pathname;
  const [page, setPage] = useState([]);

  useEffect(() => {
    pageApi.getPage(url)
      .then(res => {
        setPage(res[0])
      })
      .catch(err => {
        console.log(err)
        history.push('/notFound')
      });
  }, [history, url])

  function handleDeletePage() {
    props.deletePage(page._id);
    history.push('/');
    window.location.reload();
  }

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
        <button onClick={handleDeletePage} className='header__popup_btn page_news_item__button page_news_item__button_red'>Удалить</button>
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

function mapDispatchToProps(dispatch) {
  return {
    deletePage: (id) => dispatch(deletePage(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageItem);
