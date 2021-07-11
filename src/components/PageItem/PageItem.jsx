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
  const [navLink, setNavLink] = useState(false);
  const [isMenuPage, setIsMenuPage] = useState(false);
  const {user, navigate} = props;

  console.log(navLink)
  console.log(page)

  useEffect(() => {
    pageApi.getPage(url)
      .then(res => {
        setIsMenuPage(false)
        setPage(res[0])
        navigate.map((item) => {
          if (item.path === url) {
            return setNavLink(item)
          } else return false
        })
      })
      .catch(() => {
        navigate.map((item) => {
          if (item.path === url) {
            return setIsMenuPage(item)
          } else return history.push('/notFound')
        })
      });
  }, [url, history, navigate])

  function handleDeletePage() {
    props.deletePage(page._id);
    history.push('/');
    window.location.reload();
  }

  return (
    <main className='page__container page_item'>
      {!!!isMenuPage && user.role === 'admin'
      && <div className='page_item__buttons'>
        <Link to={{
          pathname: '/editor',
          state: {
            title: 'Редактировать страницу',
            forPage: true,
            data: page,
            isEdit: true,
            id: page._id
          }
        }} className='header__popup_btn header__popup_btn_green page_item__button'>Редактировать</Link>
        <button onClick={handleDeletePage}
                className='header__popup_btn page_item__button page_item__button_red'>Удалить
        </button>
      </div>
      }
      {!!isMenuPage
        ? <>
          <h1 className='page_item__head'>Выберите страницу</h1>
          <div className='page_item__links'>
            {isMenuPage.dropMenu.map((item, i) => {
              return <Link id={`id${i}`} className='nav__link teachers__list_item_bac page_item__links_item' key={i}
                           to={item.path}>{item.name}</Link>
            })}
          </div>
        </>
        : <>
          <h1 className='page_item__head'>{page.title}</h1>
          <div dangerouslySetInnerHTML={{__html: page.description}}/>
        </>
      }
    </main>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.userData,
    navigate: state.nav.nav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePage: (id) => dispatch(deletePage(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageItem);
