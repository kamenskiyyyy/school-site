import './TeachersItem.css';
import {serverUrl} from "../../../utils/constants";
import {Link} from "react-router-dom";

function TeachersItem({item, id, round}) {
  return <Link key={item._id} to={{
    pathname: `/teachers/${item._id}`,
    state: {
      id: `id${id}`
    }
  }} className={`teachers__list_item ${round && 'pageTeacher__colleagues__list_item'}`}>
    <div className='teachers__list_item_bac' id={`id${id}`}><img src={`${serverUrl}${item.avatar}`}
                                                                 alt={`Фотография ${item.name}`}/></div>
    <h3 className='teachers__list_item_name'>{item.name}</h3>
    <p className='teachers__list_item_desc'>{item.position}</p>
  </Link>
}

export default TeachersItem;
