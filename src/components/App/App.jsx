import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page__container">
      <Header />
      <Switch>
        <Route path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
