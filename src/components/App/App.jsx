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
import Profile from "../Profile/Profile";
import {useCookies} from "react-cookie";
import Teachers from "../Teachers/Teachers";
import PageItem from "../PageItem/PageItem";
import CreateUser from "../Profile/CreateUser/CreateUser";
import NotFound from "../NotFound/NotFound";

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
      {props.isLogin
        ? <Switch>
          {/*<Route exact path='/editor' component={TextEditorPage}/>*/}
          <Route exact path='/teachers' component={Teachers}/>
          <Route exact path='/news/:id' component={PageNewsItem}/>
          <Route path='/news' component={News}/>
          <Route path='/profile/create' component={CreateUser}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/notFound' component={NotFound}/>
          <Route exact path='/:id' component={PageItem}/>
          <Route exact path='/:id/:id' component={PageItem}/>
          <Route exact path='/' component={Main}/>
          <Route path='*' component={NotFound}/>
        </Switch>
        : <Switch>
          <Route exact path='/teachers' component={Teachers}/>
          <Route exact path='/news/:id' component={PageNewsItem}/>
          <Route path='/news' component={News}/>
          <Route path='/signin' component={Login}/>
          <Route path='/notFound' component={NotFound}/>
          <Route exact path='/:id' component={PageItem}/>
          <Route exact path='/:id/:id' component={PageItem}/>
          <Route exact path='/' component={Main}/>
          <Route path='*' component={NotFound}/>
        </Switch>}
      <Footer/>
    </>
  );
}

function mapStateToProps(state)
{
  return {
    isLogin: state.auth.isLogin
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    autoLogin: () => dispatch(autoLogin()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
