import React, {useState} from "react";
import Cookies from 'js-cookie';

function Login({isLoggedIn,setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseData, setResponseData] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = (e) => {
        if(!validateEmail(email)) {
            setResponseData('Błędny format emaila');
            return null;
        }
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email,password}),
        })
            .then((response)=>{
                if(response.status === 401){
                    setIsLoggedIn(false);
                    setResponseData('Niepoprawne dane logowania');
                    return null;
                }
                if(!response.ok){
                    setIsLoggedIn(false);
                    setResponseData("Błąd serwera");
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
                return response.json()
            })
            .then((data)=>{
                console.log(data);
                if(data){
                    Cookies.set('userId',data.id,{expires: 7});
                    Cookies.set('role',data.role,{expires: 7});
                    Cookies.set('password',password,{expires: 7});
                    setIsLoggedIn(true);
                    setResponseData('Zalogowano pomyślnie');
                }
            })
            .catch((error) => {
                    console.error('Error:', error)
                    isLoggedIn(false);
                    setResponseData('Błąd serwera');
                });
    };

    const handleRegister = (e) => {
        if(!validateEmail(email)) {
            setResponseData('Błędny format emaila');
            return null;
        }
        e.preventDefault();
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email,password}),
        })
            .then((response)=>{
                if(response.status === 409){
                    setIsLoggedIn(false);
                    setResponseData('Email o podanych danych jest już w systemie');
                    return null;
                }
                if(!response.ok){
                    setIsLoggedIn(false);
                    throw new Error(`HTTP error Status: ${response.status}`);
                }
            return response.json()
            })
            .then((data)=>{
                console.log(data);
                if(data){
                    Cookies.set('userId',data.id,{expires: 7});
                    Cookies.set('role','user',{expires: 7});
                    Cookies.set('password',password,{expires: 7});
                    setIsLoggedIn(true);
                    setResponseData('Zarejestrowano użytkownika');
                }})
            .catch((error) => {
                console.error('Error:', error)
                isLoggedIn(false);
                setResponseData('Błąd serwera');
            });
    };

    return (
        <div>
            <div className={'list-container'}><h1>Strona logowania</h1></div>
            {isLoggedIn === false ? (
                <div className={'list-container'}>
                    <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
                        <label>Email</label>
                        <input type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                        <label>Password</label>
                        <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <button onClick={handleLogin}>Zaloguj</button>
                        <button onClick={handleRegister}>Zarejestruj</button>
                    </form>
                </div>)
                :
                (
                    <div>
                        <div className={'list-container'}>
                            <p>Dane użytkownika: <br/>id: {Cookies.get('userId')} <br/> rola: {Cookies.get('role')}</p>
                        </div>
                        <div className={'list-container'}>
                            <button onClick={() => {
                                Cookies.set('userId', -1);
                                Cookies.set('role', 'guest');
                                console.log('wylogowano');
                                setIsLoggedIn(false);
                            }}>Wyloguj
                            </button>
                        </div>
                    </div>
                )
            }
            <div className={'list-container'}><p>{responseData}</p></div>

        </div>
    )
}
export default Login;