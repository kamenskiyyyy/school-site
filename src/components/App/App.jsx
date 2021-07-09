import './App.css';
import {Switch, Route, withRouter} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import News from "../News/News";
import PageNewsItem from "../PageNewsItem/PageNewsItem";
import TextEditorPage from "../PageTextEditor/PageTextEditor";
import {useEffect} from "react";
import Login from "../Login/Login";
import {connect} from "react-redux";
import {autoLogin, logout} from "../../store/actions/auth";
import ProtectedRoute from "../../hoc/ProtectedRoute";
import Profile from "../Profile/Profile";
import {useCookies} from "react-cookie";
import Teachers from "../Teachers/Teachers";
import PageItem from "../PageItem/PageItem";

function App(props) {
  const [cookie] = useCookies(['logged'])

  useEffect(() => {
    if (cookie.logged === 'true') {
      props.autoLogin()
    }
  }, [cookie.logged, props])

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path='/editor' component={TextEditorPage}/>
        <Route exact path='/teachers' component={Teachers}/>
        <Route exact path='/news/:id' component={PageNewsItem}/>
        <Route path='/news' component={News}/>
        <Route path='/signin' component={Login}/>
        <ProtectedRoute path='/profile'>
          <Profile/>
        </ProtectedRoute>
        <Route exact path='/:id' component={PageItem}/>
        <Route exact path='/:id/:id' component={PageItem}/>
        <Route path='/' component={Main}/>
      </Switch>
      <Footer/>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
