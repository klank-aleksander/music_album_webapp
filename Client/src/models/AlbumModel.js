import React, {useState} from 'react';

function AlbumModel({ title, artist, releaseYear, genre ,country, picture}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const changeDetails = () => {
        setIsExpanded(!isExpanded);
    };

    releaseYear = new Date(releaseYear);
    releaseYear.setDate(releaseYear.getDate() + 1);
    releaseYear = releaseYear.toISOString().slice(0,10);
    return (
        <li>
            <img src={picture} alt={`Okładka albumu ${title}`} />
            <p onClick={changeDetails} className={'special-p'}>
                {title}
            </p>
            {isExpanded && (
                <div>
                    <p>Wykonawca: {artist}</p>
                    <p>Data wydania: {releaseYear}</p>
                    <p>Gatunek: {genre}</p>
                    <p>Kraj: {country}</p>
                </div>
            )}
        </li>
    );
}

export default AlbumModel;