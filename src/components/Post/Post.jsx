import React, {createRef, useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as heart, faTrashAlt, faEdit} from "@fortawesome/free-regular-svg-icons";

import './style.css'
const Post = ({ item, id, favorite, editPost, deletePost }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title)

    const handleFavorite = () =>{
        favorite(id);
    }
    const handleDelete = () => {
        deletePost(id);
    }
    const handleEdit = (event) => {
        if (!editing){
            setEditing(true)

        } else{
            editPost(id,title)
            setEditing(false)
        }
    }
    const handleChangeText = (event) => {
        setTitle(event.target.value)
    }
    const handleKeyPress = (event) => {
        if(event.key === "Enter" || event.key === "Esc"){

            handleEdit();
        }
    }
    const handleBlur = (event) =>{
        handleEdit()
    }
    const inputRef= useRef();
    useEffect(()=>{
        if (inputRef.current !== undefined && inputRef.current !== null ){
            inputRef.current.focus();
        }
    },[editing])

    return(
        <div className={"post"}>
            <div>
                {!editing ? <h2>{title}</h2> : <input ref={inputRef} placeholder={"Enter title..."} value={title} onChange={handleChangeText} onBlur={handleBlur} onKeyPress={handleKeyPress}/>}
                <p>{item.post_date}</p>
            </div>
            <div className={"controlBtn"}>
                <div onClick={handleFavorite}> {item.is_favorite ?<FontAwesomeIcon icon={faHeart}/>: <FontAwesomeIcon icon={heart}/>}</div>
                <div onClick={handleEdit}><FontAwesomeIcon icon={faEdit}/></div>
                <div onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt}/></div>
            </div>

        </div>
    )
}

export default Post