import './TeachersItem.css';
import {serverUrl} from "../../../utils/constants";
import {NavLink} from "react-router-dom";

function TeachersItem({item, id}) {
  console.log(item)
  return <NavLink key={item._id} to={`/teachers/${item._id}`} className='teachers__list_item'>
    <div className='teachers__list_item_bac' id={`id${id}`}><img src={`${serverUrl}${item.avatar}`} alt={`Фотография ${item.name}`}/></div>
    <h3 className='teachers__list_item_name'>{item.name}</h3>
    <p className='teachers__list_item_desc'>{item.position}</p>
  </NavLink>
}

export default TeachersItem;
