import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import News from "../News/News";
import PageNewsItem from "../PageNewsItem/PageNewsItem";
import TextEditorPage from "../PageTextEditor/PageTextEditor";
import {Fragment} from "react";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path='/editor'>
          <TextEditorPage />
        </Route>
        <Route exact path='/news/:id'>
          <PageNewsItem />
        </Route>
        <Route path='/news'>
          <News/>
        </Route>
        <Route path='/'>
          <Main/>
        </Route>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
