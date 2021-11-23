/**
* @jest-environment jsdom
*/


const request = require('supertest');
// import server
const { expect } = require("@jest/globals");
const { commentCreation, reactionCreation } = require("../js/creation");
const app = require('../js/allPosts');
let fullComment = 'Hello there, general kenobi'
let emptyComment = ' ';

let testData = [{
    title: "What do you call a fish wearing a bowtie?",
    description: "Sofishticated.",
    author: "Jakirul",
    gif: "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
},
{
    title: "Why was the scarecrow promoted?",
    description: "Because he was outstanding in his field.",
    author: "Jakirul",
    gif: "https://media1.giphy.com/media/3ohs4iUIR6b14Hv9N6/200.gif?cid=474c6cfd2opmtx9o0svu9rngse7qpgdzkpb6sfpgqokwq66q&rid=200.gif&ct=g"
    
}]


describe("creation.js", () => {
    describe('comment creation',()=>
        it('it lets you make a comment', ()=>{
            expect(commentCreation(fullComment)).toBeDefined()
        })
        )
        it('it rejects empty comments',()=>{
            commentCreation(emptyComment);
            let para = document.getElementsByClassName('emptyComm')
            expect(para.textContent).toEqual("Empty comments are not allowed - please try again!")
        })

    describe('reaction creation',()=>{
        beforeAll(() => {
            reactionCreation(testData)
        });
    
        it('it lets you you add a reaction',()=>{
            expect(reactionCreation()).toBeDefined()
        })
        it('fetches the right reactions',()=>{
            expect(document.querySelector(".reactions").childElementCount).toEqual(3)
        })
    })
}
)