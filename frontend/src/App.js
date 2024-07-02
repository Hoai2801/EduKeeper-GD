import "./App.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import {Upload} from "./pages/Upload";
import SideBar from "./components/SideBar";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import AccoutAction from "./pages/AccoutAction";
import User from "./pages/User";
import Admin from "./pages/Admin";
import AcceptDocs from "./pages/AcceptDocs";
import Department from "./pages/Department";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import Profile from "./pages/Profile";
import UserHome from "./components/UserHome";
import UserInfor from "./pages/UserInfor";
import UserUploadDocument from "./components/UserUploadDocument";
import UserFavoriteDocument from "./components/UserFavoriteDocument";
import DeletedDocument from "./pages/ListDocsDeleted";

function App() {
    window.scrollTo(0, 0);
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path='/edit/:slug' element={<Upload/>}/>
                <Route path='/profile/:staff_code' element={<Profile/>}>
                    <Route path='' element={<UserHome/>}/>
                    <Route path='document/upload' element={<UserUploadDocument/>}/>
                    <Route path='document/favorite' element={<UserFavoriteDocument/>}/>
                    <Route path='information' element={<UserInfor/>}/>
                </Route>
                <Route path="/document/:slug" element={<Detail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/account/:action/:token" element={<AccoutAction/>}/>
                <Route element={<SideBar/>}>
                    <Route path="/search" element={<Search/>}/>
                </Route>
            </Route>
            <Route path="/dashboard" element={<Admin/>}>
                <Route index path="home" element={<Dashboard/>}/>
                <Route path="users" element={<User/>}/>
                <Route path="department" element={<Department/>}/>
                <Route path="document" element={<Document/>}/>
                <Route path="deleted" element={<DeletedDocument/>}/>
            </Route>
        </Routes>
    );
}

export default App;
