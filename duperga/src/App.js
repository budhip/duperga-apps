import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Store from './stores'
import ListItem from './components/ListItem'
import Navbar from './components/Navbar'
import Detail from './components/Detail'
import Sidebar from './components/Sidebar'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Sidebar />
            <div className="container-fluid">
              <Route exact path ="/ListItem" component={ListItem} />
              <Route exact path ="/detail/:id" component={Detail} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
