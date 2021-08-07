import './PageTeacher.css';
import {connect} from "react-redux";
import {getAllTeachers, getTeacher} from "../../store/actions/users";
import {useHistory} from "react-router-dom";
import {serverUrl} from "../../utils/constants";
import TeachersItem from "../Teachers/TeachersItem/TeachersItem";
import {useEffect} from "react";

function PageTeacher(props) {
  const currentId = useHistory().location.pathname.replace(/^\/teachers\//, '');
  const {getTeacher, getAllTeachers, teacher, teachers} = props;
  const avatar = serverUrl + teacher.avatar;
  let config = props.location.state;

  useEffect(() => {
    console.log('useEffect')
    getTeacher(currentId);
    getAllTeachers();
  }, [currentId, getAllTeachers, getTeacher])

  if (!!!config) config = {id: "id6"}

  return (
    <main className='pageTeacher'>
      <div id={config.id} className='pageTeacher__layout teachers__list_item_bac'>
        <div className='pageTeacher__preview'>
          <div className='pageTeacher__preview__text'>
            <h1>{teacher.name}</h1>
            <div>
              <p>{teacher.position}</p>
              <p>{teacher.email}</p>
            </div>
          </div>
          <img src={avatar} alt={`Фотография ${teacher.name}`}/>
        </div>
      </div>

      <div className='page__container pageTeacher__colleagues'>
        {!!teacher.category &&
          teacher.category.map((elem, index) => {
          return <div id={elem} key={index}><h2 className='teachers__list_name pageTeacher__colleagues__name'>{elem}</h2>
            <div className='teachers__list pageTeacher__colleagues__list'>
              {teachers.map((item, i) => {
                if (item.category.some(item => item === elem) && item._id !== teacher._id) {
                  return <TeachersItem id={index} key={i} item={item} round={true}/>
                } else return undefined
              })}
            </div>
          </div>
        })}
      </div>
    </main>
  )
}

function mapStateToProps(state)
{
  return {
    teacher: state.users.teacher,
    teachers: state.users.data
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    getTeacher: (id) => dispatch(getTeacher(id)),
    getAllTeachers: () => dispatch(getAllTeachers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTeacher);
