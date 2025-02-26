import React, { useState } from 'react';
import Cookies from "js-cookie";
import UserAlbum from "../models/UserAlbum";

function AddAlbum({isLoggedIn,setIsLoggedIn}) {
    const [albumName, setAlbumName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [pictureLink, setPictureLink] = useState('');
    const [genres, setGenres] = useState('');
    const [artists, setArtists] = useState('');
    const [rating, setRating] = useState('');
    const [info, setInfo] = useState('');
    const [operationInfo,serOperationInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/addAlbum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: Cookies.get('password'),
                userId: Cookies.get('userId'),
                albumName,
                releaseDate,
                pictureLink,
                genres: genres.split(',').map(g => g.trim()),
                artists: artists.split(',').map(a => a.trim()),
                rating,
                info,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    serOperationInfo('Błąd dodawania albumu');
                    throw new Error('Błąd dodawania albumu');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log('Album dodany do kolekcji!');
                serOperationInfo('Album dodany do kolekcji!');
            })
            .catch((error) => console.error(error));
    };

    if (isLoggedIn === true) {
        return (
            <>
                <div className={'list-container'}><h1>Dodaj Album</h1></div>
                <div className={'form-container'}>
                    <form onSubmit={handleSubmit}>
                        <label>Nazwa:</label>
                        <input required={true} value={albumName} onChange={(e) => setAlbumName(e.target.value)}/>
                        <br/>
                        <label>Data wydania:</label>
                        <input required={true} type="date" value={releaseDate}
                               onChange={(e) => setReleaseDate(e.target.value)}/>
                        <br/>
                        <label>Link do zdjęcia:</label>
                        <input value={pictureLink} onChange={(e) => setPictureLink(e.target.value)}/>
                        <br/>
                        <label>Gatunki:</label>
                        <input value={genres} onChange={(e) => setGenres(e.target.value)}/>
                        <br/>
                        <label>Artyści:</label>
                        <input value={artists} onChange={(e) => setArtists(e.target.value)}/>
                        <br/>
                        <label>Ocena:</label>
                        <input type="number" value={rating} min="1"
                               max="10" onChange={(e) => setRating(e.target.value)}/>
                        <br/>
                        <label>Info:</label>
                        <textarea value={info} onChange={(e) => setInfo(e.target.value)}/>
                        <br/>
                        <div className={'button-container'}>
                            <button type="submit">Add Album</button>
                        </div>
                    </form>
                </div>
                <div className={'list-container'}>
                    <p>{operationInfo}</p>
                </div>
            </>
        )
    } else {
        return ( <>
            <div className={'list-container'}>
                <h1>Dodaj album</h1>
            </div>
            <p>Zaloguj po więcej funkcji</p>
        </>)
    }

}

export default AddAlbum;
