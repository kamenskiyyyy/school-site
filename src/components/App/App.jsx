import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import News from "../News/News";
import PageNewsItem from "../PageNewsItem/PageNewsItem";

function App() {
  return (
    <div className="page__container">
      <Header/>
      <Switch>
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
    </div>
  );
}

export default App;
