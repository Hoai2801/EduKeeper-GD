import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { Upload } from './pages/Upload';
import SideBar from './components/SideBar';
import Specialized from './pages/Specialized';
import Detail from './pages/Detail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/document/:slug' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<SideBar />} >
          <Route path='/specialized/:slug' element={<Specialized />} />
        </Route>
      </Route>
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
