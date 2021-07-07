import './editor.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useState} from "react";
import {useValidationForm} from "../../hooks/useValidationForm";
import {connect} from "react-redux";
import {createNewNews} from "../../store/actions/editor";
import {transliteration} from "../../utils/utils";

function PageTextEditor(props) {
  let [data, setData] = useState();
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
  }

  return (
    <main className='page__container editor'>

      <h2>{props.location.state.title}</h2>
      <form name='editor-form' onSubmit={handleSubmit} className='editor__form'>
        <div>
          <label>Название статьи</label>
          <input name="title" autoComplete='off' required type="text" placeholder='Введите название статьи'
                 onChange={handleErrors}/>
        </div>
        <span className='login__form_span'>{errors.title}</span>
        <div>
          <label>Выберите категорию:</label>
          <select defaultValue='Выберите категорию' name="categories" required onChange={handleErrors}>
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
          <select defaultValue='' name="isPublic" required onChange={handleErrors}>
            <option disabled></option>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={props.location.state.data}
          config={{
            language: 'ru'
          }}

          onChange={(event, editor) => {
            handleChange(event, editor)
          }}
        />

        <button disabled={!isValid} type='submit'>Сохранить</button>
      </form>
      {/*<div className="editor-preview">*/}
      {/*  <h2>Предпросмотр</h2>*/}
      {/*  <div dangerouslySetInnerHTML={{__html: save}}/>*/}
      {/*</div>*/}
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
    createNewNews: (e, title, categories, isPublic, description, guid, author, date) => dispatch(createNewNews(e, title, categories, isPublic, description, guid, author, date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTextEditor);
