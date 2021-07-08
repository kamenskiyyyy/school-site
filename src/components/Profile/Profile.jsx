import './Profile.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {serverUrl} from "../../utils/constants";

function Profile(props) {
  const user = props.user;
  const avatar = serverUrl + user.avatar;

  return (
    <main className='page__container profile'>
      <div className='profile__info'>
        <img src={avatar} alt="Фотография профиля"/>
        <div>
          <h1 className='profile__info_name'>{user.name}</h1>
          <table className='profile__info_table'>
            <tbody>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Роль</td>
              <td>{user.role}</td>
            </tr>
            <tr>
              <td>Должность</td>
              <td>{user.position}</td>
            </tr>
            <tr>
              <td>Предмет</td>
              <td>{user.subjects.join(', ')}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      {user.role === 'admin'
      && <div className='profile__info__btn'>
        <Link className='header__popup_btn header__popup_btn_green' to={{
          pathname: '/editor',
          state: {
            title: 'Добавить новость',
            forNews: true,
            data: undefined,
            id: undefined
          }
        }
        }>Добавить новость</Link>
        <Link className='header__popup_btn header__popup_btn_green' to={{
          pathname: '/editor',
          state: {
            title: 'Добавить страницу',
            forPage: true,
            data: undefined,
            id: undefined
          }
        }
        }>Добавить страницу</Link>
      </div>
      }
    </main>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(Profile);
