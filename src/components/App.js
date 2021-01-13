import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);                // 초기 설정 확인
  const [userObj, setUserObj] = useState(null);           // 로그인 처리용

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {   // onAuthStateChanged를 통해 user값을 받아왔을때
      if(user){
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args)
        });                                         // 유저 정보가 있으면 유저 정보 설정. object 전체 말고 필요한 정보만 설정하기
      }else{
        setUserObj(null);
      }
      setInit(true);                              // 로그인 초기 설정 완료
    })
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args)
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {Boolean(userObj)} userObj = {userObj} /> : "Initializing..."}
      <footer>&copy; NaceBook {new Date().getFullYear}</footer>
    </>
  );
}

export default App;
