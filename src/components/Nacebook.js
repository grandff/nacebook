import React, { useState } from "react";
import {dbService} from "fbase";

const Nacebook = ({nacebookObj, isOwner}) => {
    const [editing, setEditing] = useState(false);                      // 수정 상태
    const [newNacebook, setNewNacebook] = useState(nacebookObj.text);   // 바꿀 내용

    // 삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("해당 글을 지우시겠습니까?");
        if(ok){
            await dbService.doc(`nacebooks/${nacebookObj.id}`).delete();
        }
    }

    // 수정모드 진입
    const toggleEditing = () => setEditing((prev) => !prev);

    // 수정할 내용 입력
    const onChange = (event) => {
        const {target : {value}} = event;
        setNewNacebook(value);
    }

    // 제출
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nacebooks/${nacebookObj.id}`).update({
           text : newNacebook 
        });
        setEditing(false);
    }

    return(
        <div>
            {
                editing ? (
                    <>
                        {
                            isOwner && (
                                <>
                                    <form onSubmit = {onSubmit}>
                                        <input type="text" placeholder="Edit your Nacebook" value={newNacebook} onChange={onChange} required/>
                                        <input type="submit" value="Update Nacebook" />
                                    </form>
                                    <button onClick={toggleEditing}>Cancel</button>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <h4>{nacebookObj.text}</h4>
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nacebook</button>
                            <button onClick={toggleEditing}>Edit Nacebook</button>
                        </>)}
                    </>
                )
            }
        </div>
    );
};

export default Nacebook;