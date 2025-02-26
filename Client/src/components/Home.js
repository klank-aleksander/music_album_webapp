import React, {useState} from 'react';
import Cookies from "js-cookie";
import TopAlbumList from "./TopAlbumList";

function Home({isLoggedIn,setIsLoggedIn}) {

    const loginInfo = () => {
        if(isLoggedIn === true){
            const id = Cookies.get('userId');
            const role = Cookies.get('role');
            return(
            <div className={'list-container'}>
                <p>Zalogowano <br/> id: {Cookies.get('userId')} <br/> rola: {Cookies.get('role')}</p>
            </div>);
        } else {
            return <div className={'list-container'}><p>Zaloguj po więcej funkcji</p></div>;
        }
    }



    return (
        <>
            <div className={'list-container'}>
                <h1>Strona główna</h1>
            </div>
            {loginInfo()}
            {TopAlbumList()}
        </>

    );

}


export default Home;