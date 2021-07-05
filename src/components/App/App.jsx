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
import {autoLogin} from "../../store/actions/auth";

function App(props) {
  const isDataUser = localStorage.getItem('userData');

  useEffect(() => {
    if (isDataUser) {
      props.autoLogin()
      console.log(props)
    }
  }, [isDataUser, props])

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path='/editor'>
          <TextEditorPage/>
        </Route>
        <Route exact path='/news/:id'>
          <PageNewsItem/>
        </Route>
        <Route path='/news'>
          <News/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='/'>
          <Main/>
        </Route>
      </Switch>
      <Footer/>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
