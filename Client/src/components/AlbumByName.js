import React, { useEffect, useState } from 'react';
import AlbumModel from "../models/AlbumModel";


function AlbumByName() {
        const [name, setName] = useState("");
        const [albums, setAlbums] = useState([]);

        const getAlbums = () => {
            fetch(`http://localhost:8080/album/name/${name}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Błąd pobierania albumu');
                    }
                    return response.json();
                })
                .then((data) => setAlbums(data))
                .catch((err) => console.error(err.message));
        };

        const onSubmit = (e) => {
            e.preventDefault();
            setAlbums([]);
            getAlbums();
        }

    return (
        <>
            <div className={'list-container'}><h1> Wyszukiwarka albumów</h1></div>
            <div className={'list-container'}>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <label>Nazwa albumu</label>
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                    <button onClick={onSubmit}>Szukaj</button><br/>
                </form>
            </div>
            <div className={'list-container'}>
                {albums.length > 0 ? (<>
                    <ul>
                        {albums.map((album) => (
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
                </>) : (<p>Brak wyników.</p>)
                }
            </div>
            </>
            )
            }
            export default AlbumByName;