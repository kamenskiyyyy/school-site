import './Teachers.css';
import {connect} from "react-redux";
import {useCallback, useEffect} from "react";
import {getPublicData} from "../../store/actions/publicData";

function Teachers(props) {

  const getData = useCallback(() => {
    props.getPublicData()
  }, [props])

  useEffect(() => {
    getData()
  }, []);

  console.log(props.publicData.publicData)

  return (
    <main className='page__container teachers'>
      <h1 className='teachers__head'>Учителя</h1>
      <p>Профессия учителя, как и мир вокруг, меняется. Появляются новые подходы, методы и даже формы обучения, идет
        непрерывный поиск адекватных времени педагогических идей. Наши педагоги — профессионалы, способные идти в ногу
        со временем и давать академические знания высокого уровня, имеющие активную жизненную позицию, готовые мыслить
        критически, свежо и нестандартно, чуткие и способные стать друзьями и наставниками для каждого ребенка.</p>

    </main>
  )
}

function mapStateToProps(state) {
  return {
    publicData: state.publicData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPublicData: () => dispatch(getPublicData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
