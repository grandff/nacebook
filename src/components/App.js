import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);                // 초기 설정 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);    // 로그인 처리용

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {   // onAuthStateChanged를 통해 user값을 받아왔을때
      if(user) setIsLoggedIn(true);               // 정보가 있으면 로그인처리
      else     setIsLoggedIn(false);              // 없으면 로그인 상태 아님
      setInit(true);                              // 로그인 초기 설정 완료
    })
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn} /> : "Initializing..."}
      <footer>&copy; NaceBook {new Date().getFullYear}</footer>
    </>
  );
}

export default App;
