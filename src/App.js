import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Draw from './pages/Draw.js'

// Redux
import {createStore} from 'redux'
import allReducer from './redux/reducers'
import {Provider} from 'react-redux'

const store = createStore(allReducer);

const App = () => {
  return (
    <div className="App">
          <Router>
            <div>
              <Switch> 
                <Route path='/'>
                  <Provider store={store}> <Draw /> </Provider>
                </Route>
              </Switch>
            </div>
          </Router>
    </div>
  );
}

export default App;
