import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login } from './../pages/index'


class App extends Component {

  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    )
  }
}

export default App;
