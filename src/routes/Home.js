import React, {useState, useEffect} from "react";
import { dbService } from "fbase";
import Nacebook from "components/Nacebook";

const Home = ({userObj}) => {    
    const [nacebook, setNacebook] = useState("");       // 게시글 신규 등록
    const [nacebooks, setNacebooks] = useState([]);     // 게시글 목록
    const [attachment, setAttachment] = useState();     // 첨부파일 목록
        
    // built in
    useEffect(() => {        
        // db select
        dbService.collection("nacebooks").onSnapshot(snapshot => {
            const nacebookArray = snapshot.docs.map((doc) => ({id : doc.id, ...doc.data()}));
            setNacebooks(nacebookArray);
        });
    }, [])

    // db insert
    const onSubmit = async (event) => {
        event.preventDefault();        
        let attachmentUrl = "";                         // 첨부파일 url
        await dbService.collection("nacebooks").add({
            text : nacebook,
            REG_DATE : Date.now(),
            REG_ID : userObj.uid
        });
        setNacebook("");        // insert 후 초기화
    };

    // set nacebook input
    const onChange = (event) => {
        const {target : {value}} = event;
        setNacebook(value);
    };

    return(
        <div>
            <h1>Home</h1>
            <form onSubmit = {onSubmit}>
                <input type="text" placeholder="new text!" value={nacebook}  onChange={onChange} />
                <input type="submit" value="Submit"/>
            </form>
            <div>
                {nacebooks.map((nacebook) => (
                    <Nacebook key = {nacebook.id} nacebookObj = {nacebook} isOwner = {nacebook.REG_ID === userObj.uid} />
                ))}
            </div>
        </div>        
    );
};

export default Home;