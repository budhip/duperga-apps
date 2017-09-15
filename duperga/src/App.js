import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Store from './stores'

import Welcome from './components/Welcome'
import ListItem from './components/ListItem'
import Detail from './components/Detail'
import LatestItem from './components/LatestItem'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <div>              
              <Route exact path ="/" component={Welcome} />
              <Route exact path="/home" component={LatestItem} />
              <Route exact path="/list-item" component={ListItem} />
              <Route exact path="/detail/:id" component={Detail} />
            </div>
            
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
