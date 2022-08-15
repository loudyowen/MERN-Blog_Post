import React,{useState, useEffect} from 'react'
import { 
    Container,
    Grow,
    Grid
} from '@material-ui/core';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";


import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";


import useStyles from "./styles";

function Home() {
    const [currentId, setCurrentId] = useState(null);
    // const styles = useStyles();
    const dispatch = useDispatch();

    // here how it work:
    // 1. we get action from action folder in this case posts.js
    // 2. send to here in useEffect and then it call dispatch
    // 3. the dispatch is send to reducers folder index.js
    //    and select base on action type
    useEffect(()=>{
        // use dispatch to dispacth an action
        dispatch(getPosts());
    },[currentId, dispatch]) //-> update without refresh with just added currentId in here because useEffect will work when we submit the form because the current id is change to null in the form so the useEffect will run
  return (
    <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home