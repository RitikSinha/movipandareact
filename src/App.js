
import Home from './pages/Home';
import Upload from './pages/Upload'
import NavBar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function App() {
  return (
   
       <Router>
         <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  exact path="/upload">
            <Upload />
          </Route>
        </Switch>
     
    </Router>
 
  );
}

export default App;
