import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../root.css'
import '../reset.min.css';
import './App.css';
import MainLayout from '../Pages/MainLayout';
import Home from '../Pages/Home';
import Team from '../Pages/Team';
import Showcase from '../Pages/Showcase';
import { GenericNotFound } from '../Components';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>} errorElement={<GenericNotFound/>}/>
          <Route path='/team' element={<Team/>} errorElement={<GenericNotFound/>}/>
          <Route path='/showcase' element={<Showcase/>} errorElement={<GenericNotFound/>}/>
          <Route path='/*' element={<GenericNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
