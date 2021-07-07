import './editor.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useEffect, useState} from "react";
import {useValidationForm} from "../../hooks/useValidationForm";
import {connect} from "react-redux";
import {createNewNews, editNewNews} from "../../store/actions/editor";
import {transliteration} from "../../utils/utils";
import {useHistory} from "react-router-dom";

function PageTextEditor(props) {
  let [data, setData] = useState();
  let [defaultTitle, setDefaultTitle] = useState(null);
  let [defaultDesc, setDefaultDesc] = useState(null);
  let [defaultCategories, setDefaultCategories] = useState(undefined);
  let [defaultIsPublic, setDefaultIsPublic] = useState(null);
  const history = useHistory();
  const {values, handleErrors, errors, isValid} = useValidationForm();

  function handleChange(e, editor) {
    setData(editor.getData())
  }

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const url = `/news/${transliteration(values.title)}-${Math.floor(Math.random() * 1000) + 1}`;
    const user = props.user._id;
    props.createNewNews(e, values.title, values.categories, values.isPublic, data, url, user, now)
    history.push('/news');
  }

  function handleUpdate(e) {
    e.preventDefault();
    const dataFromEdit = props.location.state.data;
    props.editNewNews(e, dataFromEdit._id, defaultTitle, defaultCategories, defaultIsPublic, data, dataFromEdit.guid, dataFromEdit.author, dataFromEdit.date);
    history.push('/news');
  }

  useEffect(() => {
    if (props.location.state.data) {
      const dataFromEdit = props.location.state.data;
      setDefaultTitle(dataFromEdit.title)
      setDefaultDesc(dataFromEdit.description)
      setDefaultCategories(dataFromEdit.categories)
      setDefaultIsPublic(dataFromEdit.isPublic)
    }
  }, [props.location.state.data])

  return (
    <main className='page__container editor'>

      <h2>{props.location.state.title}</h2>
      <form name='editor-form' onSubmit={props.location.state.isEdit ? handleUpdate : handleSubmit}
            className='editor__form'>
        <div>
          <label>Название статьи</label>
          <input name="title" autoComplete='off' required type="text" defaultValue={defaultTitle}
                 placeholder='Введите название статьи'
                 onChange={props.location.state.isEdit ? (e => setDefaultTitle(e.target.value)) : handleErrors}/>
        </div>
        <span className='login__form_span'>{errors.title}</span>
        <div>
          <label>Выберите категорию:</label>
          <select defaultValue={'Выберите категорию'} value={defaultCategories} disabled={defaultCategories}
                  name="categories" required
                  onChange={props.location.state.isEdit ? (e => setDefaultCategories(e.target.value)) : handleErrors}>
            <option disabled>Выберите категорию</option>
            <option value='Новости'>Новости</option>
            <option value='Важное'>Важное</option>
          </select>
        </div>
        <span className='login__form_span'>{errors.categories}</span>
        <div><label>Загрузите обложку</label>
          {/*здесь будет загрузка обложки*/}</div>
        <div>
          <label>Опубликовать</label>
          <select defaultValue={defaultIsPublic} name="isPublic" required
                  onChange={props.location.state.isEdit ? (e => setDefaultIsPublic(e.target.value)) : handleErrors}>
            <option disabled/>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={defaultDesc}
          config={{
            language: 'ru'
          }}

          onChange={(event, editor) => {
            handleChange(event, editor)
          }}
        />

        {props.location.state.isEdit
          ? <button type='submit'>Изменить</button>
          : <button disabled={!isValid} type='submit'>Сохранить</button>}
      </form>
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
    createNewNews: (e, title, categories, isPublic, description, guid, author, date) => dispatch(createNewNews(e, title, categories, isPublic, description, guid, author, date)),
    editNewNews: (e, id, title, categories, isPublic, description, guid, author, date) => dispatch(editNewNews(e, id, title, categories, isPublic, description, guid, author, date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTextEditor);
