import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../root.css'
import '../reset.css';
import './App.css';
import MainLayout from '../Pages/MainLayout';
import Team from '../Pages/Team';
import Showcase from '../Pages/Showcase';
import GenericNotFound from '../Components/ErrorHandling/GenericNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path='/team' element={<Team/>}></Route>
          <Route path='/showcase' element={<Showcase/>}></Route>
          <Route component={GenericNotFound} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
