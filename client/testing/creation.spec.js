/**
* @jest-environment jsdom
*/

const { expect } = require("@jest/globals");
const { commentCreation, reactionCreation } = require("../js/creation");
const { getAllPosts } = require("../js/allPosts")
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
    beforeEach(()=>{
        getAllPosts(testData)

	});

    describe('comment creation',()=>
        it('it has a comment creating function', ()=>{
            expect(commentCreation(emptyComment)).toBeDefined()
            expect(typeof(commentCreation)).toBe('function')
        })
        )
        it('it rejects empty comments',()=>{
            commentCreation(emptyComment);
            const addEvnt = new Event('submit')
            document.dispatchEvent(addEvnt)
            
            let para = document.getElementsByClassName('emptyComm')
            expect(para.textContent).toEqual("Empty comments are not allowed - please try again!")
        })
    })

describe('reaction creation',()=>{

    
    it('it lets you you add a reaction',()=>{
        expect(reactionCreation()).toBeDefined()
    })
    it('fetches the right reactions',()=>{
        expect(document.querySelector(".reactions").childElementCount).toEqual(3)
        })
    })
