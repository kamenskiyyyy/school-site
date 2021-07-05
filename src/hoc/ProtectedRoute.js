import {Route} from 'react-router-dom';
import {connect} from "react-redux";

function ProtectedRoute(props) {
  return (
    <Route>
      {props.isAuthenticated && props.children}
    </Route>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.userData
  }
}

export default connect(mapStateToProps, null)(ProtectedRoute);
