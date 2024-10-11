
import './App.css'
import Header from './component/header';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import AddNewBlog from './pages/add-blog';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/add-blog' element={<AddNewBlog/>}></Route>
      </Routes>
    </div>
  )
}

export default App
