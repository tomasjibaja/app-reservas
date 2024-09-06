import Router from './router/Router.jsx'
import Provider from './context/Provider.jsx'
import './App.css'

function App() {

  return (
    <Provider>
      <div className="container">
        <Router />
      </div>
    </Provider>
  )
}

export default App
