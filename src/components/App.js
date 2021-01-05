import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);                // 초기 설정 확인
  const [userObj, setUserObj] = useState(null);           // 로그인 처리용

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {   // onAuthStateChanged를 통해 user값을 받아왔을때
      if(user) setUserObj(user);                  // 유저 정보가 있으면 유저 정보 설정
      setInit(true);                              // 로그인 초기 설정 완료
    })
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn = {Boolean(userObj)} userObj = {userObj} /> : "Initializing..."}
      <footer>&copy; NaceBook {new Date().getFullYear}</footer>
    </>
  );
}

export default App;
