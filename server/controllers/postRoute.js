const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    let post = Post.allPost;
    res.status(200).send(post);
})

//Add new post
router.post('/', (req, res) => {
    Post.newPost(req.body);
    res.status(201).send('done');
     
});

router.put('/comment/:comment', (req, res) => {
    let commentId = req.params.comment;
  
    try {
        Post.newComment(req, commentId);
        res.status(201).send('Post was successfully updated.');
    } catch(e) {
        res.status(404).send("ERROR: TRY AGAIN LATER")
    }
})

router.put('/reaction/:reaction/:id/:add', (req, res) => {
    const {reaction, id, add} = req.params
    
    try {
        
        Post.updateReaction(reaction, id, add)
        res.status(200).send('New reaction!');
      
        
    } catch(e) {
        res.status(404).send("ERROR: TRY AGAIN LATER")
    }
})

module.exports = router;
