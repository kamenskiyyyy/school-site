import './editor.css';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useEffect, useState} from "react";
import {useValidationForm} from "../../hooks/useValidationForm";
import {createNewNews, createNewPage, editNewNews, editPage} from "../../store/actions/editor";
import {transliteration} from "../../utils/utils";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {serverUrl} from "../../utils/constants";

function PageTextEditor(props) {
  let [data, setData] = useState();
  let [defaultTitle, setDefaultTitle] = useState(null);
  let [defaultDesc, setDefaultDesc] = useState(null);
  let [defaultCategories, setDefaultCategories] = useState(undefined);
  let [defaultDate, setDefaultDate] = useState(undefined);
  let [defaultIsPublic, setDefaultIsPublic] = useState(undefined);
  const history = useHistory();
  const {values, handleErrors, errors, isValid} = useValidationForm();
  const config = props.location.state;

  function handleChange(e, editor) {
    setData(editor.getData())
  }

  function choiceSubmit(e) {
    e.preventDefault();
    if (config.forNews && config.isEdit) {
      handleUpdateForNews(e)
    } else if (config.forNews) {
      handleSubmitForNews(e)
    }
    if (config.forPage && config.isEdit) {
      handleUpdateForPage(e)
    } else if (config.forPage) {
      handleSubmitForPage(e)
    }
  }

  function handleSubmitForNews(e) {
    const url = `/news/${transliteration(values.title)}-${Math.floor(Math.random() * 1000) + 1}`;
    const user = props.user._id;
    props.createNewNews(e, values.title, values.categories, values.isPublic, data, getCover(data), url, user, values.date)
    history.push('/news');
    window.location.reload();
  }

  function handleUpdateForNews(e) {
    const dataFromEdit = config.data;
    props.editNewNews(e, dataFromEdit._id, defaultTitle, defaultCategories, defaultIsPublic, data, getCover(data), dataFromEdit.guid, dataFromEdit.author, defaultDate);
    console.log(getCover(data))
    history.push('/news');
    window.location.reload();
  }

  function handleSubmitForPage(e) {
    const link = props.navigate.find(l => l._id === values.catalog)
    if (link.dropMenu === undefined) {
      link.dropMenu = []
    }
    console.log(link.dropMenu)
    const url = `${link.path}/${transliteration(values.title)}`;
    const menu = [...link.dropMenu, {name: values.title, path: url}]
    props.createNewPage(e, values.title, data, url, values.isPublic, values.catalog, menu)
    history.push('/');
    window.location.reload();
  }

  function handleUpdateForPage(e) {
    const dataFromEdit = config.data;
    props.editPage(e, dataFromEdit._id, defaultTitle, data, dataFromEdit.link, defaultIsPublic);
    history.push('/');
    window.location.reload();
  }

  function getCover(html) {
    const cover = new DOMParser().parseFromString(html, 'text/html').getElementsByTagName('img');
    if (cover.length > 0) {
      return cover[0].src
    } else {
      return null
    }
  }

  useEffect(() => {
    if (config.data) {
      const dataFromEdit = config.data;
      setDefaultTitle(dataFromEdit.title)
      setDefaultDesc(dataFromEdit.description)
      setDefaultCategories(dataFromEdit.categories)
      const d = new Date(dataFromEdit.date);
      const date = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`;
      setDefaultDate(date)
      setDefaultIsPublic(dataFromEdit.isPublic)
    }
  }, [config.data])

  return (
    <main className='page__container editor'>

      <h2>{config.title}</h2>
      <form name='editor-form'
            onSubmit={choiceSubmit}
            className='editor__form'>

        <label>{`Название ${config.forPage ? 'страницы' : 'статьи'} `}
          <input name="title" autoComplete='off' required type="text" defaultValue={defaultTitle}
                 placeholder='Введите название'
                 onChange={config.isEdit ? (e => setDefaultTitle(e.target.value)) : handleErrors}/>
        </label>
        <span className='login__form_span'>{errors.title}</span>

        {config.forPage
          ? <label>Выберите каталог:
            <select defaultValue={config.isEdit ? defaultCategories : 'Выберите каталог'}
                    name="catalog" required
                    onChange={config.isEdit ? (e => setDefaultCategories(e.target.value)) : handleErrors}>
              <option disabled>Выберите каталог</option>
              {props.navigate.map((link, i) => {
                return <option key={i} value={link._id}>{link.name}</option>
              })}
            </select>
          </label>
          : <>
            <label>Выберите категорию:
              <select defaultValue={config.isEdit ? defaultCategories : 'Выберите категорию'}
                      name="categories" required
                      onChange={config.isEdit ? (e => setDefaultCategories(e.target.value)) : handleErrors}>
                <option disabled>Выберите категорию</option>
                <option value='Новости'>Новости</option>
                <option value='Важное'>Важное</option>
              </select>
            </label>
            <span className='login__form_span'>{errors.categories}</span>
            <label>Дата публикации:
              <input defaultValue={config.isEdit ? defaultDate : null} name="date" type="date" required
                     onChange={config.isEdit ? (e => setDefaultDate(e.target.value)) : handleErrors}/>
            </label>
            <span className='login__form_span'>{errors.date}</span>
          </>
        }
        <label>Опубликовать
          <select defaultValue={config.isEdit ? defaultIsPublic : ''} name="isPublic" required
                  onChange={config.isEdit ? (e => setDefaultIsPublic(e.target.value)) : handleErrors}>
            <option disabled/>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </label>

        <CKEditor
          editor={ClassicEditor}
          data={defaultDesc}
          config={{
            language: 'ru',
            ckfinder: {
              uploadUrl: `${serverUrl}/news/uploads`
            }
          }}

          onChange={(event, editor) => {
            handleChange(event, editor)
          }}
        />

        {config.isEdit ? <button type='submit'>Изменить</button>
          : <button disabled={!isValid} type='submit'>Создать</button>}
      </form>
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
    createNewNews: (e, title, categories, isPublic, description, cover, guid, author, date) => dispatch(createNewNews(e, title, categories, isPublic, description, cover, guid, author, date)),
    editNewNews: (e, id, title, categories, isPublic, description, cover, guid, author, date) => dispatch(editNewNews(e, id, title, categories, isPublic, description, cover, guid, author, date)),
    createNewPage: (e, title, description, link, isPublic, idMenu, menu) => dispatch(createNewPage(e, title, description, link, isPublic, idMenu, menu)),
    editPage: (e, id, title, description, link, isPublic) => dispatch(editPage(e, id, title, description, link, isPublic))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTextEditor);
