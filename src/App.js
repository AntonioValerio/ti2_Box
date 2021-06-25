import './App.css';
import Home from './Components/Home';
import BoxEdit from './Components/BoxEdit';
import BoxList from './Components/BoxList';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App(){

return(
  <div>
    <Router>
      <Switch>
        <Route  path='/' exact={true} component={Home} />
        <Route  path='/box' exact={true} component={BoxList} />
        <Route  path='/box/:id'  component={BoxEdit} />
      </Switch>
    </Router>
  </div>
)

}
export default App;

