import './EditUsers.css';
import {subjects} from "../../Teachers/Teachers";
import {useValidationForm} from "../../../hooks/useValidationForm";
import {connect} from "react-redux";
import {createNewUsers} from "../../../store/actions/users";
import {useState} from "react";
import {usersApi} from "../../../utils/Users";

function EditUsers(props) {
  const config = props.location.state;
  const {values, handleErrors, errors, isValid} = useValidationForm();
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultAvatar, setDefaultAvatar] = useState();
  const [file, setFile] = useState();
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);

  function handleCategoryChange(e) {
    const values = Array.from(e.target.selectedOptions, option => option.value)
    setDefaultCategory(values);
  }

  function handleAvatarChange(e) {
    setFile(e.target.files[0])
  }

  function handleUploadAvatar(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', file);
    usersApi.uploadUserAvatar(data)
      .then(res => {
        console.log(res.url)
        setDefaultAvatar(res.url)
        setIsUploadAvatar(true)
      })
  }

  function choiceSubmit(e) {
    e.preventDefault();
    handleSubmitForCreate()
  }

  function handleSubmitForCreate(e) {
    const {name, position, subjects, email, login, password, role, work} = values;
    const subjectsArray = subjects.split(', ')
    props.createNewUsers(name, position, subjectsArray, defaultCategory, email, login, password, role, work, defaultAvatar);
    // history.push('/teachers');
    // window.location.reload();
  }

  return (
    <main className='page__container createUser'>
      <h2>{config.title}</h2>
      <div className='createUser__forms'>
        <form name='edit-users' className='editor__form' onSubmit={choiceSubmit}>
          <label>Имя пользователя:
            <input name='name' type="text" autoComplete='off' required placeholder='например: Иванов Иван Иванович'
                   onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.name}</span>
          <label>Введите описание:
            <input name='position' type="text" autoComplete='off' required
                   placeholder='например: Заместитель директора и учитель физики' onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.position}</span>
          <label>Предметы (через запятую):
            <input name='subjects' type="text" autoComplete='off' placeholder='например: Физика, Музыка, Литература'
                   onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.subjects}</span>
          <label>Категория (несколько с зажатым Ctrl):
            <select name='category' required size={4} multiple defaultValue={['Выберите категорию']}
                    onChange={handleCategoryChange}>
              <option disabled>Выберите категорию</option>
              {subjects.map((link, i) => {
                return <option key={i} value={link}>{link}</option>
              })}
            </select>
          </label>
          <label>E-mail:
            <input name='email' type="email" autoComplete='off' required placeholder='например: example@example.ru'
                   onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.email}</span>
          <label>Логин (как в Параграф):
            <input name='login' type="login" autoComplete='off' required placeholder='например: Афанасьев'
                   onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.login}</span>
          <label>Пароль (как в Параграф):
            <input name='password' type="password" autoComplete='off' required placeholder='например: 123456'
                   onChange={handleErrors}/>
          </label>
          <span className='login__form_span'>{errors.password}</span>
          <label>Выберите тип аккаунта:
            <select name='role' required defaultValue='Выберите тип аккаунта' onChange={handleErrors}>
              <option disabled>Выберите тип аккаунта</option>
              <option value="admin">Администратор</option>
              <option value="user">Учитель</option>
            </select>
          </label>
          <span className='login__form_span'>{errors.role}</span>
          <label>Учитель работает?
            <select name='work' required defaultValue='Выберите' onChange={handleErrors}>
              <option disabled>Выберите</option>
              <option value="true">Да</option>
              <option value="false">Нет</option>
            </select>
          </label>
          <span className='login__form_span'>{errors.work}</span>
          <button disabled={!isValid} type='submit'>Создать пользователя</button>
        </form>
        {isUploadAvatar
          ? <p>Аватарка загружена</p>
          : <form encType='multipart/form-data' className='editor__form'>
            <label>Фотография:
              <input name='avatar' type="file" onChange={handleAvatarChange}/>
            </label>
            <button onClick={handleUploadAvatar}>Загрузить</button>
          </form>
        }
      </div>
    </main>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createNewUsers: (name, position, subjects, category, email, login, password, role, work, avatar) => dispatch(createNewUsers(name, position, subjects, category, email, login, password, role, work, avatar)),
  }
}

export default connect(null, mapDispatchToProps)(EditUsers);
