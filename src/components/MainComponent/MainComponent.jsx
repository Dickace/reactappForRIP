import React, {useEffect, useState} from 'react';
import axios from "axios";
import API from "../../api_url.json"
import Post from "../Post/Post";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './style.css'

function MainComponent () {
    const [postsList, setPostsList] = useState('');

    const addPost = () =>{
        let newPost = {
            title: 'New Post',
            post_date: new Date(Date.now()).toISOString()
        };
        axios({
            "method":"POST",
            "url": `${API.API_URL}/posts`,
            data: newPost
        })
            .then(response => {
                console.log(response.data)
                setPostsList([...postsList,newPost])
            })
            .catch(error => console.log(error))
    }

    const checkFunc = () =>{
        console.log();
    }

    const deletePost = (id) =>{
        axios({
            "method": "DELETE",
            "url": `${API.API_URL}/posts/${id}`
        }).then( response => {
            const value = postsList.find(x=> x.id === id);
            setPostsList(postsList.filter((item)=>{
                return item !== value
            }))

        })
            .catch(error =>{console.log(error)})

    }

    const editPost = (id, newTitle) =>{
        let editDate = new Date(Date.now()).toISOString()
        console.log(editDate)
        let editablePost = {
            title: newTitle,
            post_date: editDate
        };
        axios({
            "method": "PATCH",
            "url": `${API.API_URL}/posts/${id}`,
            data: editablePost
        }).then(response =>{
            const list = [...postsList];
            let item = {...postsList[list.indexOf(list.find(x=> x.id === id))]}
            item.title = response.data.data.title;
            item.post_date = response.data.data.post_date;
            list[list.indexOf(list.find(x=> x.id === id))] = item;
            setPostsList([...list]);
        }).catch(error =>{
            console.log(error)
        })
    }

    const favorite = (id) =>{
        axios({
            "method": "PUT",
            "url": `${API.API_URL}/posts/${id}/favorite`
        }).then(response => {
            const list = [...postsList];
            let item = {...postsList[list.indexOf(list.find(x=> x.id === id))]}
            item.is_favorite = response.data.data.is_favorite;
            list[list.indexOf(list.find(x=> x.id === id))] = item;
            setPostsList([...list]);
        }).catch( error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        axios({
            "method": "GET",
            "url" : `${API.API_URL}/posts`,
        })
            .then( response => {
                setPostsList(response.data.data)
            })
            .catch( err =>{
                console.log(err)
            })
    },[])

    return(
        <div>
            {console.log(postsList)}
            {postsList ? postsList.map( (item, index)=>{
                    return(
                        <Post editPost={editPost} deletePost={deletePost} favorite={favorite} item={item} key={item.id} id={item.id}/>
                    )
                }): <p>No posts</p>
            }
            <div onClick={addPost} className={"addBtn"}><FontAwesomeIcon icon={faPlusSquare} /></div>

        </div>

    )
}

export default MainComponent