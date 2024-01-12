import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { Upload } from './pages/Upload';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;
