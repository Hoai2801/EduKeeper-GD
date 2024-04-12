import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { Upload } from './pages/Upload';
import SideBar from './components/SideBar';
import Detail from './pages/Detail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import AccoutAction from './pages/AccoutAction';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/document/:slug' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account/:action/:token' element={<AccoutAction />} />
        <Route element={<SideBar />} >
          <Route path='/search' element={<Search />} />
        </Route>
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
