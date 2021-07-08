import {Route} from 'react-router-dom';
import {connect} from "react-redux";

function ProtectedRoute(props) {
  return (
    <Route>
      {props.isLogin && props.children}
    </Route>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin
  }
}

export default connect(mapStateToProps, null)(ProtectedRoute);
