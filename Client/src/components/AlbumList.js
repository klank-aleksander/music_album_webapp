import React,{useEffect,useState} from "react";
import AlbumModel from "../models/AlbumModel";


function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:8080/album')
            .then((response)=>{
                if(!response.ok){
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAlbums(data)
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

    return (
        <div>
        <div className="form-container"><h1>Baza albumów</h1></div>
            <div className="list-container">
                <ul>
                    {curretAlbums.map((album) => (
                        <AlbumModel
                            key={album.id}
                            title={album.album_name}
                            artist={album.artist}
                            releaseYear={album.release_date}
                            genre={album.genre}
                            country={album.country}
                            picture={album.picture_link}
                        />
                    ))}
                </ul>
            </div>
            <div className={'list-container'}>
                <button onClick={goToPrevPage} disabled={currentPage === 1}>←</button>
                <p>Strona {currentPage} z {Math.ceil(albums.length/itemsPerPage)}</p>
                <button onClick={goToNextPage} disabled={currentPage === Math.ceil(albums.length/itemsPerPage)}>→</button>
            </div>
        </div>
    );
}

export default AlbumList;