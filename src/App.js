import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import './styles/Global.scss'

export const App = () => {
  console.log(process.env)
  return (
    <BrowserRouter>
    {/* {`NODE_ENV: ${process.env.NODE_ENV}`} */}
    {`BASE_URL: ${process.env.BASE_URL}`}
    {`PORT: ${process.env.PORT}`}
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
