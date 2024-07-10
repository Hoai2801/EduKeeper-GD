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
import BannerManager from "./pages/BannerManager";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import Subject from "./pages/Subject";

function App() {
    window.scrollTo(0, 0);

    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            const decodedJwt = jwtDecode(token);
            setJwt(decodedJwt);
        }
    }, []);

    useEffect(() => {
        if (jwt) {
            const checkIfBlocked = () => {
                fetch('http://localhost:8080/api/v1/users/is-blocked/' + jwt?.staff_code)
                    .then(res => res.text())
                    .then(data => {
                        if (data === "true") {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }
                    });
            };

            // Run immediately when jwt is set
            checkIfBlocked();

            // Set interval to run every 30 seconds
            const intervalId = setInterval(checkIfBlocked, 30000);

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [jwt]);
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/upload' element={<Upload />}/>
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
                    <Route path="/search" element={<Search jwt={jwt}/>}/>
                </Route>
            </Route>
            <Route path="/dashboard" element={<Admin/>}>
                <Route index path="home" element={<Dashboard/>}/>
                <Route path="users" element={<User/>}/>
                <Route path="department" element={<Department/>}/>
                <Route path="document" element={<Document/>}/>
                <Route path="subject" element={<Subject />}/>
                <Route path="banner" element={<BannerManager jwt={jwt}/>}/>
                <Route path="deleted" element={<DeletedDocument/>}/>
            </Route>
        </Routes>
    );
}

export default App;
