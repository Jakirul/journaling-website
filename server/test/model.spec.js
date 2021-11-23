const Post = require('../models/Post.js');
const postData = require('../data/postData.json')

describe('Post model', () => {
    let testData = {
        "title": "What do you call a fish wearing a bowtie?",
        "description": "Sofishticated.",
        "author": "Jakirul",
        "gif": "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
        
    }

    it('makes an instance of a post which is at the top of the array and has the right id and date', () => {
        const post = new Post(testData);
        expect(post.title).toBe('What do you call a fish wearing a bowtie?');
        expect(postData[0].title).toBe('What do you call a fish wearing a bowtie?');
        expect(toString(post.date).substr(0,5)).toEqual(toString(new Date().toUTCString()).substr(0,5));
    });

});