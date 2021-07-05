import './Profile.css';
import logo from '../../images/pattern1.png';
import {connect} from "react-redux";

function Profile(props) {
  const user = props.user;
  const avatar = 'http://localhost:3030' + user.avatar;
  console.log(props.user)
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
            <tr>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(Profile);
