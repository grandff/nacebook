import { authService, dbService } from "fbase";
import React, { Profiler, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();           
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);          // 새로운 프로필 이름
    const [attachment, setAttachment] = useState();                                     // 프로필 사진 설정

    // 로그아웃 기능
    const onLogOutClick = () => {
        authService.signOut();      // 로그아웃
        history.push("/");          // redirect 대신 push로 홈으로 이동
    };

    // 내가 쓴글 불러오기
    const getMyNacebooks = async() => {
        await dbService.collection("nacebooks").where("creatorId","==",userObj.uid).orderBy("createdAt").get();
    };

    useEffect(() => {
        getMyNacebooks();
    }, []);

    
}

export default Profile;