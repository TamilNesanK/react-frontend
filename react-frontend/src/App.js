import './App.css';
import './components/ListEmployee'
import ListEmployee from './components/ListEmployee';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployee from './components/CreateEmployee';
import {BrowserRouter as Router,Routes as Switch , Route,Link } from 'react-router-dom';
function App() {
  return (
   <div>
     <Router>
     <HeaderComponent></HeaderComponent>
     <div className="container">
        <Switch>
        <Route path="/" exact element={<ListEmployee/>}></Route>
          <Route path="/employees" exact element={<ListEmployee/>}></Route>
          <Route path="/add-employee" exact element={<CreateEmployee/>}></Route>
          <Route path="/add-employee?id:id" exact element={<CreateEmployee/>}></Route>
        </Switch>
        </div>  
     <FooterComponent></FooterComponent>
     </Router>
    </div>
  );
}

export default App;
