import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Store from './stores'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Detail from './components/Detail'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path ="/" component={Home} />
            <Route exact path ="/edit/:id" component={Detail} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
