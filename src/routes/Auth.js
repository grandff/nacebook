import React, {useState} from "react";
import {authService, firebaseInstance} from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");                 // email
    const [password, setPassword] = useState("");           // password
    const [newAccount, setNewAccount] = useState(true);     // new account register
    const [error, setError] = useState("");                 // get error

    const onChange = (event) => {                   // email, password 등록
        const {target : {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();

        try{
            let data;
            if(newAccount){     // 회원가입
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{              // 로그인
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }

            console.log(data);      // 성공 메시지에 따른 추가 처리 하긔..!!
        }catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev); // 로그인 또는 회원가입 처리 버튼.. 나는 이거 안써도 될듯?
    const onSocialClick = async (event) => {                    // SNS 로그인 팝업 형식
        const {target : {name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name ==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);       // 이것도 따로 리턴을 해야하남..?
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder = "Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder = "Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;