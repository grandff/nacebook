import { dbService, storageService } from "fbase";
import {v4 as uuidv4} from "uuid";
import React, { useState } from "react";

const NacebookFactory = ({userObj}) => {
    const [nacebook, setNacebook] = useState("");       // 게시글 신규 등록
    const [attachment, setAttachment] = useState();     // 첨부파일 목록

    // db insert
    const onSubmit = async (event) => {
        event.preventDefault();                
        // 이미지 첨부
        let attachmentUrl = "";                         // 첨부파일 url
        if (attachment !== ""){
            // 사진에 이름은 uuid를 통해 랜덤으로 생성
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const nacebookObj = {
            text : nacebook,
            REG_DATE : Date.now(),
            REG_ID : userObj.uid,
            attachmentUrl
        }        

        await dbService.collection("nacebooks").add(nacebookObj);
        setNacebook("");        // insert 후 초기화
        setAttachment("");      // insert 후 초기화
    };

    // 이미지 미리보기
    const onFileChange = (event) => {
        const {target : {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    // 이미지 미리보기 지우기
    const onClearAttachmentClick = () => setAttachment(null);

    // set nacebook input
    const onChange = (event) => {
        const {target : {value}} = event;
        setNacebook(value);
    };

    return(
        <form onSubmit = {onSubmit}>
            <input type="text" placeholder="new text!" value={nacebook}  onChange={onChange} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Submit"/>
            {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick = {onClearAttachmentClick}>Clear</button>
                </div>
            }
        </form>
    );
}

export default NacebookFactory;