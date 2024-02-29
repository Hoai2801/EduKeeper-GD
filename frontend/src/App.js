import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { Upload } from './pages/Upload';
import SideBar from './components/SideBar';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route element={<SideBar />} >
          <Route path='/nganh' element={<p>Helllooiaojglajglk</p>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
