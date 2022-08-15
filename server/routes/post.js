import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controller/posts.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/',getPosts)
// using auth middleware to check if user is able to do the action
router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)

router.patch('/:id/like', auth, likePost)

export default router;