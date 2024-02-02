import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../root.css'
import '../reset.css';
import './App.css';
import MainLayout from '../Pages/MainLayout';
import Home from '../Pages/Home';
import Team from '../Pages/Team';
import Showcase from '../Pages/Showcase';
import GenericNotFound from '../Components/ErrorHandling/GenericNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/team' element={<Team/>}/>
          <Route path='/showcase' element={<Showcase/>}/>
          <Route component={GenericNotFound} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
