import './Teachers.css';
import {connect} from "react-redux";
import {useEffect} from "react";
import {getPublicData} from "../../store/actions/publicData";
import TeachersItem from "./TeachersItem/TeachersItem";

function Teachers(props) {
  let dataPublic = props.teachers.publicData
  const subjects = ["Руководство", "Воспитатели", "Начальное образование", "Словесность", "Социальные науки", "Иностранные языки", "Естественные науки", "Математика и информатика", "Физическая культура и спорт", "Искусство и культура", "Служба сопровождения", "Библиотекари"];

  useEffect(() => {
    props.getPublicData();
    //eslint-disable-next-line
  }, []);

  return (
    <main className='page__container teachers'>
      <h1 className='teachers__head'>Коллектив</h1>
      <p className='teachers__desc'>Профессия учителя, как и мир вокруг, меняется. Появляются новые подходы, методы и
        даже формы обучения, идет
        непрерывный поиск адекватных времени педагогических идей. Наши педагоги — профессионалы, способные идти в ногу
        со временем и давать академические знания высокого уровня, имеющие активную жизненную позицию, готовые мыслить
        критически, свежо и нестандартно, чуткие и способные стать друзьями и наставниками для каждого ребенка.</p>
      {
        props.teachers.loading
          ? <p>Загрузка...</p>
          : <>
            {subjects.map((elem, index) => {
              return <div id={elem} key={index}><h2 className='teachers__list_name'>{elem}</h2>
                <div className='teachers__list'>
                  {dataPublic.map((item, i) => {
                    if (item.category.some(item => item === elem)) {
                      return <TeachersItem id={index} key={i} item={item} />
                    } else return undefined
                  })}
                </div>
              </div>
            })}
          </>
      }
    </main>
  )
}

function mapStateToProps(state) {
  return {
    teachers: state.teachers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPublicData: () => dispatch(getPublicData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
