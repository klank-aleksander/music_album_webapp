import React, {useState} from 'react';

function UserAlbum({ id, title, artist, releaseYear, genre, country, picture, rating, info, onDelete, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editRating, setEditRating] = useState(rating);
    const [editInfo, setEditInfo] = useState(info);

    const changeDetails = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEdit(id, editRating, editInfo);
        setIsEditing(false);
    };

    releaseYear = new Date(releaseYear);
    releaseYear.setDate(releaseYear.getDate() + 1);
    releaseYear = releaseYear.toISOString().slice(0, 10);

    return (
        <li>
            <img src={picture} alt={`Okładka albumu ${title}`}/>
            <p onClick={changeDetails} className={'special-p'}>
                {title}
            </p>
            {isExpanded && (
                <div>
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Ocena:
                                <input
                                    type="number"
                                    value={editRating}
                                    onChange={(e) => setEditRating(e.target.value)}
                                    min="1"
                                    max="10"
                                />
                            </label>
                            <br />
                            <label>
                                Info:
                                <textarea
                                    value={editInfo}
                                    onChange={(e) => setEditInfo(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="submit">Zapisz</button>
                            <button type="button" onClick={() => setIsEditing(false)}>
                                Anuluj
                            </button>
                        </form>
                    ) : (
                        <>
                            <p>Wykonawca: {artist}</p>
                            <p>Data wydania: {releaseYear}</p>
                            <p>Gatunek: {genre}</p>
                            <p>Kraj: {country}</p>
                            <p>Ocena: {rating}</p>
                            <p>Info: {info}</p>
                            <button onClick={() => setIsEditing(true)}>Edytuj</button>
                            <button onClick={() => onDelete(id)}>Usuń</button>
                        </>
                    )}
                </div>
            )}
        </li>
    );
}

export default UserAlbum;
