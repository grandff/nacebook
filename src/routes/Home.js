import React, {useState, useEffect} from "react";
import { dbService } from "fbase";
import Nacebook from "components/Nacebook";
import NacebookFactory from "components/NacebookFactory";

const Home = ({userObj}) => {        
    const [nacebooks, setNacebooks] = useState([]);     // 게시글 목록    
        
    // built in
    useEffect(() => {        
        // db select
        dbService.collection("nacebooks").onSnapshot(snapshot => {
            const nacebookArray = snapshot.docs.map((doc) => ({id : doc.id, ...doc.data()}));
            setNacebooks(nacebookArray);
        });
    }, [])        

    return(
        <div>
            <h1>Home</h1>
            <NacebookFactory userObj={userObj} />
            <div>
                {nacebooks.map((nacebook) => (
                    <Nacebook key = {nacebook.id} nacebookObj = {nacebook} isOwner = {nacebook.REG_ID === userObj.uid} />
                ))}
            </div>
        </div>        
    );
};

export default Home;