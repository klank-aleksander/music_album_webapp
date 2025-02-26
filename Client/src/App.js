import './App.css';
import React, {useState} from "react";
import AlbumList from './components/AlbumList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Cookies from "js-cookie";
import AlbumByName from "./components/AlbumByName";
import AddAlbum from "./components/AddAlbum";
import UserAlbumList from "./components/UserAlbumList";
import ArtistList from "./components/ArtistList";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('userId') > 0);
    const [password, setPassword] = useState(Cookies.get('password'));


  return (
    <div className="App">
        <Router>
            <header className={'header'}>
                <Link to="/">Strona główna </Link>
                <Link  to="/album">Baza albumów </Link>
                <Link  to="/album/user">Twoje albumy </Link>
                <Link className={'active'} to="/login">Logowanie </Link>
                <Link  to="/addAlbum">Dodaj album </Link>
                <Link  to="/artists">Lista wykonawców </Link>
                <Link  to="/album/name">Szukaj albumu </Link>
            </header>
            <Routes>
                <Route path="/album" element={<AlbumList />} />
                <Route path="/addAlbum" element={<AddAlbum isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/album/name" element={<AlbumByName />} />
                <Route path="/album/user" element={<UserAlbumList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/artists" element={<ArtistList />} />
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} password={password} setPassword={setPassword} />} />
                <Route path="*" element={<h1>404 - Nie znaleziono</h1>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
