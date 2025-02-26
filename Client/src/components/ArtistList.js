import React, { useEffect, useState } from 'react';
import ArtistModel from "../models/ArtistModel";

function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:8080/artists')
            .then((response) => response.json())
            .then((data) => setArtists(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = (currentPage * itemsPerPage);
    const curretArtists = artists.slice(startIndex,endIndex);

    const goToNextPage = () => {
        if(currentPage < Math.ceil(artists.length/itemsPerPage)){
            setCurrentPage(currentPage+1);
        }
    }

    const goToPrevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
            <div className="list-container">
                <h1>Lista wykonawców</h1>
            </div>
            <div className="list-container">
                <ul>
                    {curretArtists.map((artist) => (
                        <ArtistModel key={artist.id} id={artist.id} name={artist.name} country={artist.country}/>
                    ))}
                </ul>
            </div>
            <div className={'list-container'}>
                <button onClick={goToPrevPage} disabled={currentPage === 1}>←</button>
                <p>Strona {currentPage} z {Math.ceil(artists.length / itemsPerPage)}</p>
                <button onClick={goToNextPage} disabled={currentPage === Math.ceil(artists.length / itemsPerPage)}>→
                </button>
            </div>
        </>
    );
}

export default ArtistList;
