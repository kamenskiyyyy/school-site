import './NotFound.css';
import {useHistory} from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function handleClickGoBack() {
    history.push('/');
  }

  return (
    <section className='notFound'>
      <div className='NotFound__text'>
        <h1 className='notFound__head'>404</h1>
        <p className='notFound__desc'>Страница не найдена</p>
      </div>
      <button className='notFound__link' onClick={handleClickGoBack}>На главную</button>
    </section>
  )
}

export default NotFound;
