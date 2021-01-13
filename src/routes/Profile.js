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

    // 새로운 프로필 정보 등록
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName : newDisplayName
            });
            refreshUser();
        }
    }

    useEffect(() => {
        getMyNacebooks();
    }, []);

    const onChange = (event) => {
        const {target : {value}} = event;
        setNewDisplayName(value);
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange = {onChange} value={newDisplayName} />
                <input type="submit" value="Update Profile" />                
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
}

export default Profile;