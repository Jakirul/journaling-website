const Post = require('../models/Post.js');

describe('Post model', () => {
    let testData = {
        "title": "What do you call a fish wearing a bowtie?",
        "description": "Sofishticated.",
        "author": "Jakirul",
        "gif": "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
        
    }

    it('makes an instance of a post', () => {
        const post = new Post(testData);
        expect(post.title).toBe('What do you call a fish wearing a bowtie?');
    });

});