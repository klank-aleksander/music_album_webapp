import React,{useEffect,useState} from "react";
import Cookies from "js-cookie";
import UserAlbum from "../models/UserAlbum";


function UserAlbumList({isLoggedIn,setIsLoggedIn}) {
    const [albums, setAlbums] = useState([]);
    const [userId, setUserId] = useState(Cookies.get("userId"));
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = (id, password) => {
        fetch(`http://localhost:8080/album/user/${userId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password:Cookies.get('password') }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
            })
            .catch((error) => console.error('Error:', error));
    };


    const handleEdit = (id, newRating, newInfo, password) => {
        fetch(`http://localhost:8080/album/user/${userId}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: newRating,
                info: newInfo,
                password: Cookies.get("password"),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(Cookies.get("password"));
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                setAlbums((prevAlbums) =>
                    prevAlbums.map((album) =>
                        album.id === id ? { ...album, rating: newRating, info: newInfo } : album
                    )
                );
            })
            .catch((error) => console.error('Error:', error));
    };




    useEffect(() => {
        fetch(`http://localhost:8080/album/user/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: Cookies.get('password') }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(Cookies.get('password'));
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAlbums(data);
            })
            .catch((error) => console.error('Error:', error));
        }, []);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = (currentPage * itemsPerPage);
    const curretAlbums = albums.slice(startIndex,endIndex);

    const goToNextPage = () => {
        if(currentPage < Math.ceil(albums.length/itemsPerPage)){
            setCurrentPage(currentPage+1);
        }
    }

    const goToPrevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    return isLoggedIn === true ? (
        <>
            <div className={'list-container'}><h1>Twoje albumy</h1></div>
            <div className={'list-container'}>
                <ul>
                    {curretAlbums.map((album) => (
                        <UserAlbum
                            key={album.id}
                            id={album.id}
                            title={album.album_name}
                            artist={album.artist}
                            releaseYear={album.release_date}
                            genre={album.genre}
                            country={album.country}
                            picture={album.picture_link}
                            rating={album.rating}
                            info={album.info}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </ul>
            </div>
            <div className={'list-container'}>
                <button onClick={goToPrevPage} disabled={currentPage === 1}>←</button>
                <p>Strona {currentPage} z {Math.ceil(albums.length / itemsPerPage)}</p>
                <button onClick={goToNextPage} disabled={currentPage === Math.ceil(albums.length / itemsPerPage)}>→</button>
                </div>
        </>
        ) : (
            <>
                <div className={'list-container'}>
                    <h1>Twoje Albumy</h1>
                </div>
                <p>Zaloguj po więcej funkcji</p>
            </>
    )

}

export default UserAlbumList;