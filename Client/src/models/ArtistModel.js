import React from 'react';

function ArtistModel({ id, name, country}) {
    return (
        <li>
            <p>Nazwa: {name}</p>
            {country != null ? (<p>Kraj: {country}</p>):""}
        </li>
    );
}

export default ArtistModel;
