
import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Builder from './pages/Builder'
const App = () => {
  return (

    <Routes>
      <Route path='/' Component={Homepage}  />
      <Route path ='/builder' Component={Builder}   / >
    </Routes>
  )
}

export default App;