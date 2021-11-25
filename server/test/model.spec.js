const Post = require('../models/Post.js');
const postData = require('../data/postData.json');
let testData = {
    "title": "What do you call a fish wearing a bowtie?",
    "description": "Sofishticated.",
    "author": "Jakirul",
    "gif": "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
}
const post = new Post(testData)
new Post(testData)
post
async function postCreation(data){
    let testPost = new Post(data)
    postData[0] = testPost
}
console.log(post.title)

describe('Post model', () => {
    it('makes an instance of a post which has the right date', () => {
        
        expect(post.title).toBe('What do you call a fish wearing a bowtie?');
        expect(toString(post.date).substr(0,5)).toEqual(toString(new Date().toUTCString()).substr(0,5));
    });
    it('puts the new post at the top of the array', async ()=>{
        await postCreation(testData)
        expect(postData[0].title).toBe('What do you call a fish wearing a bowtie?');
    })
    it('has the right id', ()=>{
        expect(postData[0].id).toBe(postData.length) 
    })

});
