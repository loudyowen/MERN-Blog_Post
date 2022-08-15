import axios from 'axios';

// const url = "https://blog-post-app-owen.herokuapp.com/blogs";

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


  

export const fetchPosts = () => API.get('/blogs');
export const createPosts = (newPost) => API.post('/blogs', newPost);
export const updatePost = (id, postData) => API.patch(`${'/blogs'}/${id}`,postData)
export const deletePost = (id) => API.delete(`${'/blogs'}/${id}`);
export const updateLikePost = (id) => API.patch(`${'/blogs'}/${id}/like`)

export const signIn = (formData) => API.post('/users/signIn',formData)
export const signUp = (formData) => API.post('/users/signUp',formData)